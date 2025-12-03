import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, timeout } from 'rxjs';
import { AxiosError } from 'axios';

export interface ServiceConfig {
  primary: string;
  mirror?: string;
  name: string;
  healthPath: string; // Ruta para verificar la salud del servicio
}

@Injectable()
export class ProxyService {
  private readonly services: Record<string, ServiceConfig> = {
    auth: {
      name: 'Auth',
      primary: 'http://localhost:3001',
      healthPath: '/auth/register', // Endpoint que existe
    },
    users: {
      name: 'Users',
      primary: 'http://localhost:3002',
      healthPath: '/users',
    },
    memes: {
      name: 'Memes',
      primary: 'http://localhost:3003',
      mirror: 'http://localhost:3013',
      healthPath: '/memes',
    },
    plantillas: {
      name: 'Plantillas',
      primary: 'http://localhost:3004',
      mirror: 'http://localhost:3014',
      healthPath: '/plantillas',
    },
  };

  constructor(private readonly httpService: HttpService) {}

  /**
   * Realiza una solicitud al servicio principal, si falla intenta con el mirror
   */
  async proxyRequest<T>(
    service: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    data?: any,
  ): Promise<T> {
    const config = this.services[service];
    if (!config) {
      throw new HttpException(`Servicio ${service} no configurado`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Intentar con el servicio principal
    try {
      const result = await this.makeRequest<T>(config.primary, method, path, data);
      console.log(`[OK] [${config.name}] Request to primary successful: ${method} ${path}`);
      return result;
    } catch (primaryError) {
      console.log(`[WARN] [${config.name}] Primary service failed: ${primaryError.message}`);

      // Si hay mirror, intentar con él
      if (config.mirror) {
        try {
          console.log(`[MIRROR] [${config.name}] Trying mirror service...`);
          const result = await this.makeRequest<T>(config.mirror, method, path, data);
          console.log(`[OK] [${config.name}] Mirror request successful: ${method} ${path}`);
          return result;
        } catch (mirrorError) {
          console.log(`[ERROR] [${config.name}] Mirror service also failed: ${mirrorError.message}`);
          throw new HttpException(
            `Servicio ${config.name} no disponible (principal y mirror fallaron)`,
            HttpStatus.SERVICE_UNAVAILABLE,
          );
        }
      }

      // Si no hay mirror, propagar el error
      throw primaryError;
    }
  }

  /**
   * Realiza una solicitud HTTP
   */
  private async makeRequest<T>(
    baseUrl: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    data?: any,
  ): Promise<T> {
    const url = `${baseUrl}${path}`;

    try {
      let response;

      switch (method) {
        case 'GET':
          response = await firstValueFrom(
            this.httpService.get(url).pipe(timeout(5000)),
          );
          break;
        case 'POST':
          response = await firstValueFrom(
            this.httpService.post(url, data).pipe(timeout(5000)),
          );
          break;
        case 'PUT':
          response = await firstValueFrom(
            this.httpService.put(url, data).pipe(timeout(5000)),
          );
          break;
        case 'DELETE':
          response = await firstValueFrom(
            this.httpService.delete(url).pipe(timeout(5000)),
          );
          break;
      }

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          throw new HttpException(
            error.response.data?.message || error.response.data || 'Error en el servicio',
            error.response.status,
          );
        } else if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
          throw new Error(`Servicio no disponible: ${baseUrl}`);
        }
      }
      throw error;
    }
  }

  /**
   * Obtiene la configuración de los servicios
   */
  getServicesConfig(): Record<string, ServiceConfig> {
    return this.services;
  }

  /**
   * Verifica si un servicio está activo haciendo una petición GET a su healthPath
   */
  private async checkServiceHealth(url: string, healthPath: string): Promise<boolean> {
    try {
      await firstValueFrom(
        this.httpService.get(`${url}${healthPath}`).pipe(timeout(2000)),
      );
      // Si llegamos aquí, el servicio respondió
      return true;
    } catch (error) {
      // Si el error tiene respuesta del servidor (4xx, 5xx), el servicio está corriendo
      if (error.response) {
        return true;
      }
      // Si es ECONNREFUSED o timeout, el servicio está caído
      return false;
    }
  }

  /**
   * Verifica el estado de todos los servicios
   */
  async checkAllServices(): Promise<Record<string, { primary: boolean; mirror?: boolean }>> {
    const statuses: Record<string, { primary: boolean; mirror?: boolean }> = {};

    for (const [key, config] of Object.entries(this.services)) {
      const primaryHealthy = await this.checkServiceHealth(config.primary, config.healthPath);
      statuses[key] = { primary: primaryHealthy };

      if (config.mirror) {
        const mirrorHealthy = await this.checkServiceHealth(config.mirror, config.healthPath);
        statuses[key].mirror = mirrorHealthy;
      }
    }

    return statuses;
  }
}

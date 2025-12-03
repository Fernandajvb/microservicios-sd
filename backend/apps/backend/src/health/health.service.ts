import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, timeout, catchError } from 'rxjs';
import { of } from 'rxjs';

export interface ServiceStatus {
  name: string;
  url: string;
  isHealthy: boolean;
  lastCheck: Date;
}

@Injectable()
export class HealthService {
  private serviceStatuses: Map<string, ServiceStatus> = new Map();

  constructor(private readonly httpService: HttpService) {}

  /**
   * Verifica si un servicio está activo
   */
  async checkServiceHealth(name: string, url: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(url).pipe(
          timeout(2000),
          catchError(() => of({ status: 500 })),
        ),
      );

      const isHealthy = response.status >= 200 && response.status < 400;

      this.serviceStatuses.set(name, {
        name,
        url,
        isHealthy,
        lastCheck: new Date(),
      });

      return isHealthy;
    } catch (error) {
      this.serviceStatuses.set(name, {
        name,
        url,
        isHealthy: false,
        lastCheck: new Date(),
      });
      return false;
    }
  }

  /**
   * Obtiene el estado de todos los servicios
   */
  getAllStatuses(): ServiceStatus[] {
    return Array.from(this.serviceStatuses.values());
  }

  /**
   * Obtiene el estado de un servicio específico
   */
  getStatus(name: string): ServiceStatus | undefined {
    return this.serviceStatuses.get(name);
  }
}


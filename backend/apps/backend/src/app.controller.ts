import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ProxyService } from './proxy/proxy.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly proxyService: ProxyService,
  ) {}

  @Get()
  getInfo() {
    return {
      name: 'MemeGen API Gateway',
      version: '1.0.0',
      description: 'Middleware que coordina las solicitudes entre el frontend y los microservicios',
      endpoints: {
        auth: '/api/auth',
        users: '/api/users',
        memes: '/api/memes',
        plantillas: '/api/plantillas',
        health: '/api/health',
      },
    };
  }

  @Get('api/health')
  async getHealth() {
    const statuses = await this.proxyService.checkAllServices();
    return {
      gateway: 'healthy',
      timestamp: new Date().toISOString(),
      services: statuses,
    };
  }
}

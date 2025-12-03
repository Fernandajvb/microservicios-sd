import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProxyService } from './proxy/proxy.service';
import { HttpModule } from '@nestjs/axios';
import { HealthService } from './health/health.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [AppService, ProxyService, HealthService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return API Gateway info', () => {
      const result = appController.getInfo();
      expect(result.name).toBe('MemeGen API Gateway');
      expect(result.version).toBe('1.0.0');
    });
  });
});

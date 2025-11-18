import { Test, TestingModule } from '@nestjs/testing';
import { RegisterServiceController } from './register-service.controller';
import { RegisterServiceService } from './register-service.service';

describe('RegisterServiceController', () => {
  let registerServiceController: RegisterServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RegisterServiceController],
      providers: [RegisterServiceService],
    }).compile();

    registerServiceController = app.get<RegisterServiceController>(RegisterServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(registerServiceController.getHello()).toBe('Hello World!');
    });
  });
});

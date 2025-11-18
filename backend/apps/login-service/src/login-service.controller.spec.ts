import { Test, TestingModule } from '@nestjs/testing';
import { LoginServiceController } from './login-service.controller';
import { LoginServiceService } from './login-service.service';

describe('LoginServiceController', () => {
  let loginServiceController: LoginServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LoginServiceController],
      providers: [LoginServiceService],
    }).compile();

    loginServiceController = app.get<LoginServiceController>(LoginServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(loginServiceController.getHello()).toBe('Hello World!');
    });
  });
});

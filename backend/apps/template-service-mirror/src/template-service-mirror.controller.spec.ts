import { Test, TestingModule } from '@nestjs/testing';
import { TemplateServiceMirrorController } from './template-service-mirror.controller';
import { TemplateServiceMirrorService } from './template-service-mirror.service';

describe('TemplateServiceMirrorController', () => {
  let templateServiceMirrorController: TemplateServiceMirrorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TemplateServiceMirrorController],
      providers: [TemplateServiceMirrorService],
    }).compile();

    templateServiceMirrorController = app.get<TemplateServiceMirrorController>(TemplateServiceMirrorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(templateServiceMirrorController.getHello()).toBe('Hello World!');
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { MemeServiceMirrorController } from './meme-service-mirror.controller';
import { MemeServiceMirrorService } from './meme-service-mirror.service';

describe('MemeServiceMirrorController', () => {
  let memeServiceMirrorController: MemeServiceMirrorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MemeServiceMirrorController],
      providers: [MemeServiceMirrorService],
    }).compile();

    memeServiceMirrorController = app.get<MemeServiceMirrorController>(MemeServiceMirrorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(memeServiceMirrorController.getHello()).toBe('Hello World!');
    });
  });
});

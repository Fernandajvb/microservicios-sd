import { Test, TestingModule } from '@nestjs/testing';
import { MemeServiceController } from './meme-service.controller';
import { MemeServiceService } from './meme-service.service';

describe('MemeServiceController', () => {
  let memeServiceController: MemeServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MemeServiceController],
      providers: [MemeServiceService],
    }).compile();

    memeServiceController = app.get<MemeServiceController>(MemeServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(memeServiceController.getHello()).toBe('Hello World!');
    });
  });
});

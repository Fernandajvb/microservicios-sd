import { Test, TestingModule } from '@nestjs/testing';
import { MemesController } from './memes.controller';
import { MemesService } from './memes.service';

describe('MemesController', () => {
  let memesController: MemesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MemesController],
      providers: [MemesService],
    }).compile();

    memesController = app.get<MemesController>(MemesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(memesController.getHello()).toBe('Hello World!');
    });
  });
});

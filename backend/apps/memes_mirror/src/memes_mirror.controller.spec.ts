import { Test, TestingModule } from '@nestjs/testing';
import { MemesMirrorController } from './memes_mirror.controller';
import { MemesMirrorService } from './memes_mirror.service';

describe('MemesMirrorController', () => {
  let memesMirrorController: MemesMirrorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [MemesMirrorController],
      providers: [MemesMirrorService],
    }).compile();

    memesMirrorController = app.get<MemesMirrorController>(MemesMirrorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(memesMirrorController.getHello()).toBe('Hello World!');
    });
  });
});

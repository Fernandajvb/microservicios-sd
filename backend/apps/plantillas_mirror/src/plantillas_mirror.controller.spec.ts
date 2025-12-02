import { Test, TestingModule } from '@nestjs/testing';
import { PlantillasMirrorController } from './plantillas_mirror.controller';
import { PlantillasMirrorService } from './plantillas_mirror.service';

describe('PlantillasMirrorController', () => {
  let plantillasMirrorController: PlantillasMirrorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PlantillasMirrorController],
      providers: [PlantillasMirrorService],
    }).compile();

    plantillasMirrorController = app.get<PlantillasMirrorController>(PlantillasMirrorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(plantillasMirrorController.getHello()).toBe('Hello World!');
    });
  });
});

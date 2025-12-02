import { Test, TestingModule } from '@nestjs/testing';
import { PlantillasController } from './plantillas.controller';
import { PlantillasService } from './plantillas.service';

describe('PlantillasController', () => {
  let plantillasController: PlantillasController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PlantillasController],
      providers: [PlantillasService],
    }).compile();

    plantillasController = app.get<PlantillasController>(PlantillasController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(plantillasController.getHello()).toBe('Hello World!');
    });
  });
});

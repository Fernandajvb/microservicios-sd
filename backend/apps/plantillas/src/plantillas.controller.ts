import { Controller, Get } from '@nestjs/common';
import { PlantillasService } from './plantillas.service';

@Controller()
export class PlantillasController {
  constructor(private readonly plantillasService: PlantillasService) {}

  @Get()
  getHello(): string {
    return this.plantillasService.getHello();
  }
}

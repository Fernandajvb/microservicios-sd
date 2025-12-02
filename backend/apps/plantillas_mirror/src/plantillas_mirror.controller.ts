import { Controller, Get } from '@nestjs/common';
import { PlantillasMirrorService } from './plantillas_mirror.service';

@Controller()
export class PlantillasMirrorController {
  constructor(private readonly plantillasMirrorService: PlantillasMirrorService) {}

  @Get()
  getHello(): string {
    return this.plantillasMirrorService.getHello();
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlantillaService } from './plantilla.service';
import { CreatePlantillaDto } from './dto/create-plantilla.dto';

@Controller('plantillas')
export class PlantillaController {
  constructor(private readonly plantillaService: PlantillaService) {}

  @Get()
  findAll() {
    return this.plantillaService.findAll();
  }

  @Post('create')
  create(@Body() dto: CreatePlantillaDto) {
    return this.plantillaService.create(dto);
  }
}

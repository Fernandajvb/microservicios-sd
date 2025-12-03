import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PlantillasService } from './plantillas.service';

@Controller('plantillas')
export class PlantillasController {
  constructor(private readonly plantillasService: PlantillasService) {}

  @Get()
  findAll() {
    return this.plantillasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.plantillasService.findOne(id);
  }

  @Get('user/:idUsuario')
  findByUser(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.plantillasService.findByUser(idUsuario);
  }

  @Post()
  create(
    @Body()
    data: {
      nombre: string;
      descripcion?: string;
      imagen: string;
      idUsuario: number;
    },
  ) {
    return this.plantillasService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    data: Partial<{
      nombre: string;
      descripcion: string;
      imagen: string;
    }>,
  ) {
    return this.plantillasService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.plantillasService.remove(id);
  }
}

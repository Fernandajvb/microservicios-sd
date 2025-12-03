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
import { PlantillasMirrorService } from './plantillas_mirror.service';

@Controller('plantillas')
export class PlantillasMirrorController {
  constructor(private readonly plantillasMirrorService: PlantillasMirrorService) {}

  @Get()
  findAll() {
    return this.plantillasMirrorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.plantillasMirrorService.findOne(id);
  }

  @Get('user/:idUsuario')
  findByUser(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.plantillasMirrorService.findByUser(idUsuario);
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
    return this.plantillasMirrorService.create(data);
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
    return this.plantillasMirrorService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.plantillasMirrorService.remove(id);
  }
}

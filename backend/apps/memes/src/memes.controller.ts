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
import { MemesService } from './memes.service';

@Controller('memes')
export class MemesController {
  constructor(private readonly memesService: MemesService) {}

  @Get()
  findAll() {
    return this.memesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.memesService.findOne(id);
  }

  @Get('user/:idUsuario')
  findByUser(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.memesService.findByUser(idUsuario);
  }

  @Post()
  create(
    @Body()
    data: {
      descripcion?: string;
      superior?: string;
      inferior?: string;
      estado?: string;
      imagen?: string;
      idUsuario: number;
      idPlantilla?: number;
    },
  ) {
    return this.memesService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    data: Partial<{
      descripcion: string;
      superior: string;
      inferior: string;
      estado: string;
      imagen: string;
      idPlantilla: number;
    }>,
  ) {
    return this.memesService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.memesService.remove(id);
  }

  @Post(':id/like')
  toggleLike(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { idUsuario: number },
  ) {
    return this.memesService.toggleLike(id, data.idUsuario);
  }

  @Get(':id/liked/:idUsuario')
  hasUserLiked(
    @Param('id', ParseIntPipe) id: number,
    @Param('idUsuario', ParseIntPipe) idUsuario: number,
  ) {
    return this.memesService.hasUserLiked(id, idUsuario);
  }

  @Get('likes/:idUsuario')
  getUserLikes(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.memesService.getUserLikes(idUsuario);
  }
}

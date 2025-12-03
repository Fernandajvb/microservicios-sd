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
import { MemesMirrorService } from './memes_mirror.service';

@Controller('memes')
export class MemesMirrorController {
  constructor(private readonly memesMirrorService: MemesMirrorService) {}

  @Get()
  findAll() {
    return this.memesMirrorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.memesMirrorService.findOne(id);
  }

  @Get('user/:idUsuario')
  findByUser(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.memesMirrorService.findByUser(idUsuario);
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
    return this.memesMirrorService.create(data);
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
    return this.memesMirrorService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.memesMirrorService.remove(id);
  }

  @Post(':id/like')
  toggleLike(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { idUsuario: number },
  ) {
    return this.memesMirrorService.toggleLike(id, data.idUsuario);
  }

  @Get('likes/:idUsuario')
  getUserLikes(@Param('idUsuario', ParseIntPipe) idUsuario: number) {
    return this.memesMirrorService.getUserLikes(idUsuario);
  }
}

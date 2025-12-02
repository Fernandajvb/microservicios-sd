import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMemeDto } from './dto/create-meme.dto';
import { CreateReaccionDto } from '../reaccion/dto/create-reaccion.dto';

@Controller()
export class MemeMessageController {
  constructor(private readonly prisma: PrismaService) {}

  @MessagePattern('create-meme')
  async createMeme(@Payload() dto: CreateMemeDto) {
    if (!dto.idUsuario) {
      throw new Error('idUsuario es requerido para crear un meme');
    }

    const superior = dto.superior ?? dto.topText ?? null;
    const inferior = dto.inferior ?? dto.bottomText ?? null;
    const imagen = dto.imagen ?? dto.image ?? dto.selectedImage ?? null;

    return this.prisma.meme.create({
      data: {
        descripcion: dto.descripcion ?? null,
        superior,
        inferior,
        estado: dto.estado ?? 'publicado',
        imagen,
        idUsuario: dto.idUsuario,
        idPlantilla: dto.idPlantilla ?? null,
      },
      include: {
        creador: true,
        plantilla: true,
        reacciones: true,
      },
    });
  }

  @MessagePattern('get-memes')
  getMemes() {
    return this.prisma.meme.findMany({
      orderBy: { fecha: 'desc' },
      include: {
        creador: true,
        plantilla: true,
        reacciones: true,
      },
    });
  }

  @MessagePattern('get-all-memes')
  getAllMemes() {
    return this.prisma.meme.findMany({
      orderBy: { fecha: 'desc' },
      include: {
        creador: true,
        plantilla: true,
        reacciones: true,
      },
    });
  }

  @MessagePattern('react-meme')
  reactToMeme(@Payload() dto: CreateReaccionDto) {
    return this.prisma.reaccion.create({
      data: {
        tipo: dto.tipo,
        idUsuario: dto.idUsuario,
        idMeme: dto.idMeme,
      },
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { Meme } from '@prisma/client';

@Injectable()
export class MemesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Meme[]> {
    return this.prisma.meme.findMany({
      include: {
        creador: {
          select: {
            idUsuario: true,
            nombre: true,
            username: true,
          },
        },
        plantilla: {
          select: {
            idPlantilla: true,
            nombre: true,
            imagen: true,
          },
        },
        reacciones: true,
      },
      orderBy: { fecha: 'desc' },
    });
  }

  async findOne(id: number): Promise<Meme> {
    const meme = await this.prisma.meme.findUnique({
      where: { idMeme: id },
      include: {
        creador: {
          select: {
            idUsuario: true,
            nombre: true,
            username: true,
          },
        },
        plantilla: true,
        reacciones: true,
      },
    });
    if (!meme) {
      throw new NotFoundException(`Meme con ID ${id} no encontrado`);
    }
    return meme;
  }

  async findByUser(idUsuario: number): Promise<Meme[]> {
    return this.prisma.meme.findMany({
      where: { idUsuario },
      include: {
        plantilla: {
          select: {
            idPlantilla: true,
            nombre: true,
            imagen: true,
          },
        },
        reacciones: true,
      },
      orderBy: { fecha: 'desc' },
    });
  }

  async create(data: {
    descripcion?: string;
    superior?: string;
    inferior?: string;
    estado?: string;
    imagen?: string;
    idUsuario: number;
    idPlantilla?: number;
  }): Promise<Meme> {
    return this.prisma.meme.create({
      data,
      include: {
        creador: {
          select: {
            idUsuario: true,
            nombre: true,
            username: true,
          },
        },
        plantilla: true,
      },
    });
  }

  async update(
    id: number,
    data: Partial<{
      descripcion: string;
      superior: string;
      inferior: string;
      estado: string;
      imagen: string;
      idPlantilla: number;
    }>,
  ): Promise<Meme> {
    await this.findOne(id);
    return this.prisma.meme.update({
      where: { idMeme: id },
      data,
      include: {
        creador: {
          select: {
            idUsuario: true,
            nombre: true,
            username: true,
          },
        },
        plantilla: true,
      },
    });
  }

  async remove(id: number): Promise<Meme> {
    const meme = await this.findOne(id);
    
    // Primero eliminar las reacciones asociadas
    await this.prisma.reaccion.deleteMany({
      where: { idMeme: id },
    });
    
    // Luego eliminar el meme
    await this.prisma.meme.delete({
      where: { idMeme: id },
    });
    
    return meme;
  }

  async toggleLike(idMeme: number, idUsuario: number): Promise<{ liked: boolean; totalLikes: number }> {
    await this.findOne(idMeme);

    const existingReaction = await this.prisma.reaccion.findFirst({
      where: {
        idMeme,
        idUsuario,
        tipo: 'like',
      },
    });

    if (existingReaction) {
      await this.prisma.reaccion.delete({
        where: { idReaccion: existingReaction.idReaccion },
      });
    } else {
      await this.prisma.reaccion.create({
        data: {
          tipo: 'like',
          idMeme,
          idUsuario,
        },
      });
    }

    const totalLikes = await this.prisma.reaccion.count({
      where: {
        idMeme,
        tipo: 'like',
      },
    });

    return {
      liked: !existingReaction,
      totalLikes,
    };
  }

  async hasUserLiked(idMeme: number, idUsuario: number): Promise<boolean> {
    const reaction = await this.prisma.reaccion.findFirst({
      where: {
        idMeme,
        idUsuario,
        tipo: 'like',
      },
    });
    return !!reaction;
  }

  async getUserLikes(idUsuario: number): Promise<number[]> {
    const reactions = await this.prisma.reaccion.findMany({
      where: {
        idUsuario,
        tipo: 'like',
      },
      select: {
        idMeme: true,
      },
    });
    return reactions.map(r => r.idMeme);
  }
}

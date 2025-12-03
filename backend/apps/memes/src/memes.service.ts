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
        plantilla: true,
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
        plantilla: true,
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
    await this.findOne(id);
    return this.prisma.meme.delete({
      where: { idMeme: id },
    });
  }
}

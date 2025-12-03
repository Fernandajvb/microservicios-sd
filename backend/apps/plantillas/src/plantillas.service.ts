import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { Plantilla_meme } from '@prisma/client';

@Injectable()
export class PlantillasService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Plantilla_meme[]> {
    return this.prisma.plantilla_meme.findMany({
      include: {
        _count: {
          select: { memes: true },
        },
      },
    });
  }

  async findOne(id: number): Promise<Plantilla_meme> {
    const plantilla = await this.prisma.plantilla_meme.findUnique({
      where: { idPlantilla: id },
      include: {
        memes: {
          take: 10,
          orderBy: { fecha: 'desc' },
        },
      },
    });
    if (!plantilla) {
      throw new NotFoundException(`Plantilla con ID ${id} no encontrada`);
    }
    return plantilla;
  }

  async create(data: {
    nombre: string;
    descripcion: string;
    imagen: string;
  }): Promise<Plantilla_meme> {
    return this.prisma.plantilla_meme.create({ data });
  }

  async update(
    id: number,
    data: Partial<{
      nombre: string;
      descripcion: string;
      imagen: string;
    }>,
  ): Promise<Plantilla_meme> {
    await this.findOne(id);
    return this.prisma.plantilla_meme.update({
      where: { idPlantilla: id },
      data,
    });
  }

  async remove(id: number): Promise<Plantilla_meme> {
    await this.findOne(id);
    return this.prisma.plantilla_meme.delete({
      where: { idPlantilla: id },
    });
  }
}

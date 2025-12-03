import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';

@Injectable()
export class PlantillasService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.plantilla_meme.findMany({
      include: {
        creador: {
          select: {
            idUsuario: true,
            nombre: true,
            username: true,
          },
        },
        _count: {
          select: { memes: true },
        },
      },
      orderBy: { fecha: 'desc' },
    });
  }

  async findOne(id: number) {
    const plantilla = await this.prisma.plantilla_meme.findUnique({
      where: { idPlantilla: id },
      include: {
        creador: {
          select: {
            idUsuario: true,
            nombre: true,
            username: true,
          },
        },
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

  async findByUser(idUsuario: number) {
    return this.prisma.plantilla_meme.findMany({
      where: { idUsuario },
      include: {
        _count: {
          select: { memes: true },
        },
      },
      orderBy: { fecha: 'desc' },
    });
  }

  async create(data: {
    nombre: string;
    descripcion?: string;
    imagen: string;
    idUsuario: number;
  }) {
    return this.prisma.plantilla_meme.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion || '',
        imagen: data.imagen,
        idUsuario: data.idUsuario,
      },
      include: {
        creador: {
          select: {
            idUsuario: true,
            nombre: true,
            username: true,
          },
        },
      },
    });
  }

  async update(
    id: number,
    data: Partial<{
      nombre: string;
      descripcion: string;
      imagen: string;
    }>,
  ) {
    await this.findOne(id);
    return this.prisma.plantilla_meme.update({
      where: { idPlantilla: id },
      data,
      include: {
        creador: {
          select: {
            idUsuario: true,
            nombre: true,
            username: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.plantilla_meme.delete({
      where: { idPlantilla: id },
    });
  }
}

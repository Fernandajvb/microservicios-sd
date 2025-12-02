import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlantillaDto } from './dto/create-plantilla.dto';

@Injectable()
export class PlantillaService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.plantilla_meme.findMany();
  }

  create(dto: CreatePlantillaDto) {
    return this.prisma.plantilla_meme.create({
      data: {
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        imagen: dto.imagen,
      },
    });
  }
}

import { Module } from '@nestjs/common';
import { PlantillaController } from './plantilla.controller';
import { PlantillaService } from './plantilla.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PlantillaController],
  providers: [PlantillaService, PrismaService],
})
export class PlantillaModule {}

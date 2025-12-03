import { Module } from '@nestjs/common';
import { PlantillasController } from './plantillas.controller';
import { PlantillasService } from './plantillas.service';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [PlantillasController],
  providers: [PlantillasService],
})
export class PlantillasModule {}

import { Module } from '@nestjs/common';
import { PlantillasMirrorController } from './plantillas_mirror.controller';
import { PlantillasMirrorService } from './plantillas_mirror.service';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [PlantillasMirrorController],
  providers: [PlantillasMirrorService],
})
export class PlantillasMirrorModule {}

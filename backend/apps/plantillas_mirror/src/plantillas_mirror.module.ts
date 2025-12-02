import { Module } from '@nestjs/common';
import { PlantillasMirrorController } from './plantillas_mirror.controller';
import { PlantillasMirrorService } from './plantillas_mirror.service';

@Module({
  imports: [],
  controllers: [PlantillasMirrorController],
  providers: [PlantillasMirrorService],
})
export class PlantillasMirrorModule {}

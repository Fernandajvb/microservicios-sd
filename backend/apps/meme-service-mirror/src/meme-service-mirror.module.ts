import { Module } from '@nestjs/common';
import { MemeServiceMirrorController } from './meme-service-mirror.controller';
import { MemeServiceMirrorService } from './meme-service-mirror.service';

@Module({
  imports: [],
  controllers: [MemeServiceMirrorController],
  providers: [MemeServiceMirrorService],
})
export class MemeServiceMirrorModule {}

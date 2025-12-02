import { Module } from '@nestjs/common';
import { MemesMirrorController } from './memes_mirror.controller';
import { MemesMirrorService } from './memes_mirror.service';

@Module({
  imports: [],
  controllers: [MemesMirrorController],
  providers: [MemesMirrorService],
})
export class MemesMirrorModule {}

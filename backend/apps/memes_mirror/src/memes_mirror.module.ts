import { Module } from '@nestjs/common';
import { MemesMirrorController } from './memes_mirror.controller';
import { MemesMirrorService } from './memes_mirror.service';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [MemesMirrorController],
  providers: [MemesMirrorService],
})
export class MemesMirrorModule {}

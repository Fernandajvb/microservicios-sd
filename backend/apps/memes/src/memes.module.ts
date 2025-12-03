import { Module } from '@nestjs/common';
import { MemesController } from './memes.controller';
import { MemesService } from './memes.service';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [PrismaModule],
  controllers: [MemesController],
  providers: [MemesService],
})
export class MemesModule {}

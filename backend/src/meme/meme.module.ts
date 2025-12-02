import { Module } from '@nestjs/common';
import { MemeController } from './meme.controller';
import { MemeMessageController } from './meme.message.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MicroserviceClientsModule } from '../common/microservice-clients.module';

@Module({
  imports: [MicroserviceClientsModule],
  controllers: [MemeController, MemeMessageController],
  providers: [PrismaService],
})
export class MemeModule {}

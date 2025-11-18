import { Module } from '@nestjs/common';
import { MemeServiceController } from './meme-service.controller';
import { MemeServiceService } from './meme-service.service';

@Module({
  imports: [],
  controllers: [MemeServiceController],
  providers: [MemeServiceService],
})
export class MemeServiceModule {}

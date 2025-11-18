import { Controller, Get } from '@nestjs/common';
import { MemeServiceService } from './meme-service.service';

@Controller()
export class MemeServiceController {
  constructor(private readonly memeServiceService: MemeServiceService) {}

  @Get()
  getHello(): string {
    return this.memeServiceService.getHello();
  }
}

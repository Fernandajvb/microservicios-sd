import { Controller, Get } from '@nestjs/common';
import { MemeServiceMirrorService } from './meme-service-mirror.service';

@Controller()
export class MemeServiceMirrorController {
  constructor(private readonly memeServiceMirrorService: MemeServiceMirrorService) {}

  @Get()
  getHello(): string {
    return this.memeServiceMirrorService.getHello();
  }
}

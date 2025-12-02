import { Controller, Get } from '@nestjs/common';
import { MemesMirrorService } from './memes_mirror.service';

@Controller()
export class MemesMirrorController {
  constructor(private readonly memesMirrorService: MemesMirrorService) {}

  @Get()
  getHello(): string {
    return this.memesMirrorService.getHello();
  }
}

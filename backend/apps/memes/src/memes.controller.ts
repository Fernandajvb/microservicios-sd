import { Controller, Get } from '@nestjs/common';
import { MemesService } from './memes.service';

@Controller()
export class MemesController {
  constructor(private readonly memesService: MemesService) {}

  @Get()
  getHello(): string {
    return this.memesService.getHello();
  }
}

import { Controller, Get } from '@nestjs/common';
import { TemplateServiceMirrorService } from './template-service-mirror.service';

@Controller()
export class TemplateServiceMirrorController {
  constructor(private readonly templateServiceMirrorService: TemplateServiceMirrorService) {}

  @Get()
  getHello(): string {
    return this.templateServiceMirrorService.getHello();
  }
}

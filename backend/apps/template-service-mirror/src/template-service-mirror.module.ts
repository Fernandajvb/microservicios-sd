import { Module } from '@nestjs/common';
import { TemplateServiceMirrorController } from './template-service-mirror.controller';
import { TemplateServiceMirrorService } from './template-service-mirror.service';

@Module({
  imports: [],
  controllers: [TemplateServiceMirrorController],
  providers: [TemplateServiceMirrorService],
})
export class TemplateServiceMirrorModule {}

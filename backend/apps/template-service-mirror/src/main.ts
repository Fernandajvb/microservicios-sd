import { NestFactory } from '@nestjs/core';
import { TemplateServiceMirrorModule } from './template-service-mirror.module';

async function bootstrap() {
  const app = await NestFactory.create(TemplateServiceMirrorModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

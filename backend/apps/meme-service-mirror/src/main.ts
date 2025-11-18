import { NestFactory } from '@nestjs/core';
import { MemeServiceMirrorModule } from './meme-service-mirror.module';

async function bootstrap() {
  const app = await NestFactory.create(MemeServiceMirrorModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

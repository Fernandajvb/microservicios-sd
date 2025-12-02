import { NestFactory } from '@nestjs/core';
import { MemesMirrorModule } from './memes_mirror.module';

async function bootstrap() {
  const app = await NestFactory.create(MemesMirrorModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

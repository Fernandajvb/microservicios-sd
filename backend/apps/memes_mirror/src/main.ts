import { NestFactory } from '@nestjs/core';
import { MemesMirrorModule } from './memes_mirror.module';

async function bootstrap() {
  const app = await NestFactory.create(MemesMirrorModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3013);
  console.log(`Memes Mirror service running on http://localhost:${process.env.PORT ?? 3013}`);
}
bootstrap();

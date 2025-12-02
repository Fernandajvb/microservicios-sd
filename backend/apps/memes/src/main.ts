import { NestFactory } from '@nestjs/core';
import { MemesModule } from './memes.module';

async function bootstrap() {
  const app = await NestFactory.create(MemesModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

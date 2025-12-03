import { NestFactory } from '@nestjs/core';
import { MemesModule } from './memes.module';

async function bootstrap() {
  const app = await NestFactory.create(MemesModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3003);
  console.log(`Memes service running on http://localhost:${process.env.PORT ?? 3003}`);
}
bootstrap();

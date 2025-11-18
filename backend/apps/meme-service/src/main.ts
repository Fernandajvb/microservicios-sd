import { NestFactory } from '@nestjs/core';
import { MemeServiceModule } from './meme-service.module';

async function bootstrap() {
  const app = await NestFactory.create(MemeServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

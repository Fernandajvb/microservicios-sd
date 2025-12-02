import { NestFactory } from '@nestjs/core';
import { PlantillasModule } from './plantillas.module';

async function bootstrap() {
  const app = await NestFactory.create(PlantillasModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

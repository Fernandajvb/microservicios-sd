import { NestFactory } from '@nestjs/core';
import { PlantillasModule } from './plantillas.module';

async function bootstrap() {
  const app = await NestFactory.create(PlantillasModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3004);
  console.log(`Plantillas service running on http://localhost:${process.env.PORT ?? 3004}`);
}
bootstrap();

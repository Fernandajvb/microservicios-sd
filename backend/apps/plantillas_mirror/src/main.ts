import { NestFactory } from '@nestjs/core';
import { PlantillasMirrorModule } from './plantillas_mirror.module';

async function bootstrap() {
  const app = await NestFactory.create(PlantillasMirrorModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3014);
  console.log(`Plantillas Mirror service running on http://localhost:${process.env.PORT ?? 3014}`);
}
bootstrap();

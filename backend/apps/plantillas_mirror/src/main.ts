import { NestFactory } from '@nestjs/core';
import { PlantillasMirrorModule } from './plantillas_mirror.module';

async function bootstrap() {
  const app = await NestFactory.create(PlantillasMirrorModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

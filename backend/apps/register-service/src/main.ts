import { NestFactory } from '@nestjs/core';
import { RegisterServiceModule } from './register-service.module';

async function bootstrap() {
  const app = await NestFactory.create(RegisterServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

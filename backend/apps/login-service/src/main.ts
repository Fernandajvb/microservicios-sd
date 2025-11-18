import { NestFactory } from '@nestjs/core';
import { LoginServiceModule } from './login-service.module';

async function bootstrap() {
  const app = await NestFactory.create(LoginServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();

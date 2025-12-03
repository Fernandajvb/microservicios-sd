import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3002);
  console.log(`Users service running on http://localhost:${process.env.PORT ?? 3002}`);
}
bootstrap();

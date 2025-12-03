import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  
  console.log(`
===============================================
   MemeGen API Gateway (Middleware)
   Running on http://localhost:${port}
===============================================

Microservicios configurados:
   - Auth:       http://localhost:3001
   - Users:      http://localhost:3002
   - Memes:      http://localhost:3003 (mirror: 3013)
   - Plantillas: http://localhost:3004 (mirror: 3014)

Endpoints disponibles:
   - GET  /                    - Info del gateway
   - GET  /api/health          - Estado de los servicios
   - POST /api/auth/register   - Registro
   - POST /api/auth/login      - Login
   - GET  /api/users           - Usuarios
   - GET  /api/memes           - Memes (con failover)
   - GET  /api/plantillas      - Plantillas (con failover)
===============================================
  `);
}
bootstrap();

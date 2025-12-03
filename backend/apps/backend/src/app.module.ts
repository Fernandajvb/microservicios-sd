import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthProxyController } from './proxy/auth-proxy.controller';
import { UsersProxyController } from './proxy/users-proxy.controller';
import { MemesProxyController } from './proxy/memes-proxy.controller';
import { PlantillasProxyController } from './proxy/plantillas-proxy.controller';
import { ProxyService } from './proxy/proxy.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [
    AppController,
    AuthProxyController,
    UsersProxyController,
    MemesProxyController,
    PlantillasProxyController,
  ],
  providers: [AppService, ProxyService],
})
export class AppModule {}

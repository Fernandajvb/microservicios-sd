import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MemeModule } from './meme/meme.module';
import { PlantillaModule } from './plantilla/plantilla.module';
import { ReaccionModule } from './reaccion/reaccion.module';

@Module({
  imports: [AuthModule, MemeModule, PlantillaModule, ReaccionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

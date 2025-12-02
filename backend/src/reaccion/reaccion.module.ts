import { Module } from '@nestjs/common';
import { ReaccionController } from './reaccion.controller';
import { MicroserviceClientsModule } from '../common/microservice-clients.module';

@Module({
  imports: [MicroserviceClientsModule],
  controllers: [ReaccionController],
})
export class ReaccionModule {}

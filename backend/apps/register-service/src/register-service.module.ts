import { Module } from '@nestjs/common';
import { RegisterServiceController } from './register-service.controller';
import { RegisterServiceService } from './register-service.service';

@Module({
  imports: [],
  controllers: [RegisterServiceController],
  providers: [RegisterServiceService],
})
export class RegisterServiceModule {}

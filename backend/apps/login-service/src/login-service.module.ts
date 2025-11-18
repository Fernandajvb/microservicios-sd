import { Module } from '@nestjs/common';
import { LoginServiceController } from './login-service.controller';
import { LoginServiceService } from './login-service.service';

@Module({
  imports: [],
  controllers: [LoginServiceController],
  providers: [LoginServiceService],
})
export class LoginServiceModule {}

import { Controller, Get } from '@nestjs/common';
import { LoginServiceService } from './login-service.service';

@Controller()
export class LoginServiceController {
  constructor(private readonly loginServiceService: LoginServiceService) {}

  @Get()
  getHello(): string {
    return this.loginServiceService.getHello();
  }
}

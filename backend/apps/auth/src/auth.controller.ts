import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    data: {
      nombre: string;
      username: string;
      correo: string;
      contrasena: string;
    },
  ) {
    return this.authService.register(data);
  }

  @Post('login')
  login(
    @Body()
    data: {
      username: string;
      contrasena: string;
    },
  ) {
    return this.authService.login(data);
  }
}

import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /auth/register
   * Registra un nuevo usuario
   */
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

  /**
   * POST /auth/login
   * Inicia sesión con username/correo y contraseña
   */
  @Post('login')
  login(
    @Body()
    data: {
      usernameOrEmail: string;
      contrasena: string;
    },
  ) {
    return this.authService.login(data);
  }

  /**
   * GET /auth/validate/:id
   * Valida si un usuario existe
   */
  @Get('validate/:id')
  validateUser(@Param('id', ParseIntPipe) id: number) {
    return this.authService.validateUser(id);
  }
}

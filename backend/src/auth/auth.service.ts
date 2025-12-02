import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    if (dto.confirmPassword && dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const username = dto.rut ?? dto.username;
    if (!username) {
      throw new BadRequestException('Se requiere un nombre de usuario o RUT');
    }

    const nombre = dto.nombre ?? username;

    const existingEmail = await this.prisma.usuario.findUnique({
      where: { correo: dto.email },
    });
    if (existingEmail) {
      throw new ConflictException('El correo ya está registrado');
    }

    const existingUser = await this.prisma.usuario.findUnique({
      where: { username },
    });
    if (existingUser) {
      throw new ConflictException('El RUT o nombre de usuario ya está registrado');
    }

    const user = await this.prisma.usuario.create({
      data: {
        nombre,
        username,
        correo: dto.email,
        contrasena: dto.password,
      },
    });

    return { message: 'Registro exitoso', user };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.usuario.findUnique({
      where: { correo: dto.email },
    });

    if (!user || user.contrasena !== dto.password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return { message: 'Login exitoso', user };
  }
}

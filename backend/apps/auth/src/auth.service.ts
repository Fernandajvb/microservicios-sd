import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { Usuario } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(data: {
    nombre: string;
    username: string;
    correo: string;
    contrasena: string;
  }): Promise<Omit<Usuario, 'contrasena'>> {
    // Verificar si ya existe el username o correo
    const existingUser = await this.prisma.usuario.findFirst({
      where: {
        OR: [{ username: data.username }, { correo: data.correo }],
      },
    });

    if (existingUser) {
      throw new ConflictException('El username o correo ya está en uso');
    }

    // En producción, deberías hashear la contraseña con bcrypt
    const usuario = await this.prisma.usuario.create({ data });

    // Retornar sin la contraseña
    const { contrasena, ...result } = usuario;
    return result;
  }

  async login(data: {
    username: string;
    contrasena: string;
  }): Promise<Omit<Usuario, 'contrasena'>> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { username: data.username },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // En producción, deberías comparar hashes con bcrypt
    if (usuario.contrasena !== data.contrasena) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Retornar sin la contraseña
    const { contrasena, ...result } = usuario;
    return result;
  }

  async validateUser(idUsuario: number): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { idUsuario },
    });
  }
}

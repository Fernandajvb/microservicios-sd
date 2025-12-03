import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { Usuario } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  /**
   * Registra un nuevo usuario
   * Verifica que no exista otro usuario con el mismo username o correo
   */
  async register(data: {
    nombre: string;
    username: string;
    correo: string;
    contrasena: string;
  }): Promise<{ message: string; usuario: Omit<Usuario, 'contrasena'> }> {
    // Validar campos requeridos
    if (!data.nombre || !data.username || !data.correo || !data.contrasena) {
      throw new BadRequestException('Todos los campos son requeridos');
    }

    // Verificar si ya existe el username
    const existingUsername = await this.prisma.usuario.findUnique({
      where: { username: data.username },
    });

    if (existingUsername) {
      throw new ConflictException('El nombre de usuario ya está en uso');
    }

    // Verificar si ya existe el correo
    const existingEmail = await this.prisma.usuario.findUnique({
      where: { correo: data.correo },
    });

    if (existingEmail) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    // Crear el usuario
    const usuario = await this.prisma.usuario.create({ data });

    // Retornar sin la contraseña
    const { contrasena, ...result } = usuario;
    return {
      message: 'Usuario registrado exitosamente',
      usuario: result,
    };
  }

  /**
   * Inicia sesión con username o correo + contraseña
   */
  async login(data: {
    usernameOrEmail: string;
    contrasena: string;
  }): Promise<{ message: string; usuario: Omit<Usuario, 'contrasena'> }> {
    // Validar campos requeridos
    if (!data.usernameOrEmail || !data.contrasena) {
      throw new BadRequestException('Usuario/correo y contraseña son requeridos');
    }

    // Buscar por username o correo
    const usuario = await this.prisma.usuario.findFirst({
      where: {
        OR: [
          { username: data.usernameOrEmail },
          { correo: data.usernameOrEmail },
        ],
      },
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    // Verificar contraseña
    if (usuario.contrasena !== data.contrasena) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    // Retornar sin la contraseña
    const { contrasena, ...result } = usuario;
    return {
      message: 'Inicio de sesión exitoso',
      usuario: result,
    };
  }

  /**
   * Valida si un usuario existe por su ID
   */
  async validateUser(idUsuario: number): Promise<Omit<Usuario, 'contrasena'> | null> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { idUsuario },
    });

    if (!usuario) {
      return null;
    }

    const { contrasena, ...result } = usuario;
    return result;
  }
}

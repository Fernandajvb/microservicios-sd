import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { Usuario } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  /**
   * Obtiene todos los usuarios (sin contraseñas)
   */
  async findAll(): Promise<Omit<Usuario, 'contrasena'>[]> {
    const usuarios = await this.prisma.usuario.findMany();
    return usuarios.map(({ contrasena, ...user }) => user);
  }

  /**
   * Obtiene un usuario por ID (sin contraseña)
   */
  async findOne(id: number): Promise<Omit<Usuario, 'contrasena'>> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { idUsuario: id },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    const { contrasena, ...result } = usuario;
    return result;
  }

  /**
   * Busca un usuario por username
   */
  async findByUsername(username: string): Promise<Omit<Usuario, 'contrasena'> | null> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { username },
    });
    if (!usuario) return null;
    const { contrasena, ...result } = usuario;
    return result;
  }

  /**
   * Busca un usuario por correo
   */
  async findByEmail(correo: string): Promise<Omit<Usuario, 'contrasena'> | null> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { correo },
    });
    if (!usuario) return null;
    const { contrasena, ...result } = usuario;
    return result;
  }

  /**
   * Crea un nuevo usuario
   * Verifica que no exista otro con el mismo username o correo
   */
  async create(data: {
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
    const { contrasena, ...result } = usuario;

    return {
      message: 'Usuario creado exitosamente',
      usuario: result,
    };
  }

  /**
   * Actualiza un usuario existente
   */
  async update(
    id: number,
    data: Partial<{
      nombre: string;
      username: string;
      correo: string;
      contrasena: string;
    }>,
  ): Promise<{ message: string; usuario: Omit<Usuario, 'contrasena'> }> {
    // Verificar que el usuario existe
    const existingUser = await this.prisma.usuario.findUnique({
      where: { idUsuario: id },
    });

    if (!existingUser) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    // Si se actualiza el username, verificar que no esté en uso
    if (data.username && data.username !== existingUser.username) {
      const usernameExists = await this.prisma.usuario.findUnique({
        where: { username: data.username },
      });
      if (usernameExists) {
        throw new ConflictException('El nombre de usuario ya está en uso');
      }
    }

    // Si se actualiza el correo, verificar que no esté en uso
    if (data.correo && data.correo !== existingUser.correo) {
      const emailExists = await this.prisma.usuario.findUnique({
        where: { correo: data.correo },
      });
      if (emailExists) {
        throw new ConflictException('El correo electrónico ya está registrado');
      }
    }

    const usuario = await this.prisma.usuario.update({
      where: { idUsuario: id },
      data,
    });

    const { contrasena, ...result } = usuario;
    return {
      message: 'Usuario actualizado exitosamente',
      usuario: result,
    };
  }

  /**
   * Elimina un usuario
   */
  async remove(id: number): Promise<{ message: string }> {
    const existingUser = await this.prisma.usuario.findUnique({
      where: { idUsuario: id },
    });

    if (!existingUser) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    await this.prisma.usuario.delete({
      where: { idUsuario: id },
    });

    return { message: 'Usuario eliminado exitosamente' };
  }
}

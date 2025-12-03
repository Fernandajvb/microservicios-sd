import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '@app/prisma';
import { Usuario } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Usuario[]> {
    return this.prisma.usuario.findMany();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { idUsuario: id },
    });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async findByUsername(username: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { username },
    });
  }

  async findByEmail(correo: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { correo },
    });
  }

  async create(data: {
    nombre: string;
    username: string;
    correo: string;
    contrasena: string;
  }): Promise<Usuario> {
    // Verificar si ya existe el username o correo
    const existingUser = await this.prisma.usuario.findFirst({
      where: {
        OR: [{ username: data.username }, { correo: data.correo }],
      },
    });

    if (existingUser) {
      throw new ConflictException('El username o correo ya está en uso');
    }

    return this.prisma.usuario.create({ data });
  }

  async update(
    id: number,
    data: Partial<{
      nombre: string;
      username: string;
      correo: string;
      contrasena: string;
    }>,
  ): Promise<Usuario> {
    await this.findOne(id); // Verificar que existe
    return this.prisma.usuario.update({
      where: { idUsuario: id },
      data,
    });
  }

  async remove(id: number): Promise<Usuario> {
    await this.findOne(id); // Verificar que existe
    return this.prisma.usuario.delete({
      where: { idUsuario: id },
    });
  }
}

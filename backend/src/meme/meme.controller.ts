import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Query,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { CreateMemeDto } from './dto/create-meme.dto';
import { PrismaService } from '../prisma/prisma.service';
import { StreamableFile } from '@nestjs/common';

@Controller('memes')
export class MemeController {
  constructor(
    @Inject('MEME_SERVICE') private readonly memeClient: ClientProxy,
    @Inject('MEME_MIRROR_SERVICE')
    private readonly memeMirrorClient: ClientProxy,
    private readonly prisma: PrismaService,
  ) {}

  private async sendWithFallback<T>(
    pattern: string,
    payload?: unknown,
  ): Promise<T> {
    const messagePayload = payload ?? {};
    try {
      const result = await firstValueFrom(
        this.memeClient.send<T>(pattern, messagePayload).pipe(timeout(3000)),
      );
      console.log(
        `[MemeController] Microservicio principal OK (pattern: ${pattern})`,
      );
      return result;
    } catch (error) {
      try {
        const mirrorResult = await firstValueFrom(
          this.memeMirrorClient.send<T>(pattern, messagePayload).pipe(timeout(3000)),
        );
        console.log(
          `[MemeController] Microservicio espejo OK (pattern: ${pattern})`,
        );
        return mirrorResult;
      } catch (mirrorError) {
        console.error(
          `[MemeController] Error en principal (${pattern}):`,
          error?.message ?? error,
        );
        console.error(
          `[MemeController] Error en espejo (${pattern}):`,
          mirrorError?.message ?? mirrorError,
        );

        // Fallback directo a Prisma para lectura/creación si ambos microservicios fallan
        if (pattern === 'get-memes' || pattern === 'get-all-memes') {
          const data = await this.prisma.meme.findMany({
            orderBy: { fecha: 'desc' },
            include: { creador: true, plantilla: true, reacciones: true },
          });
          console.log(
            `[MemeController] Fallback directo Prisma OK (pattern: ${pattern})`,
          );
          return data as unknown as T;
        }

        if (pattern === 'create-meme') {
          const dto = payload as CreateMemeDto;
          const superior = dto?.superior ?? dto?.topText ?? null;
          const inferior = dto?.inferior ?? dto?.bottomText ?? null;
          const imagen = dto?.imagen ?? dto?.image ?? dto?.selectedImage ?? null;

          const created = await this.prisma.meme.create({
            data: {
              descripcion: dto?.descripcion ?? null,
              superior,
              inferior,
              estado: dto?.estado ?? 'publicado',
              imagen,
              idUsuario: dto?.idUsuario!,
              idPlantilla: dto?.idPlantilla ?? null,
            },
            include: { creador: true, plantilla: true, reacciones: true },
          });
          console.log(
            `[MemeController] Fallback directo Prisma OK (pattern: ${pattern})`,
          );
          return created as unknown as T;
        }

        throw new InternalServerErrorException(
          'No se pudo procesar la solicitud de memes',
        );
      }
    }
  }

  @Post('create')
  create(@Body() dto: CreateMemeDto) {
    return this.sendWithFallback('create-meme', dto);
  }

  @Get()
  findAll() {
    return this.sendWithFallback('get-memes');
  }

  @Get('all')
  findAllForFeed() {
    return this.sendWithFallback('get-all-memes');
  }

  @Get('proxy')
  async proxyImage(@Query('url') url?: string): Promise<StreamableFile> {
    if (!url) {
      throw new InternalServerErrorException('Falta el parámetro url');
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`No se pudo descargar la imagen (${response.status})`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const contentType = response.headers.get('content-type') || 'image/png';
      return new StreamableFile(buffer, {
        type: contentType,
      });
    } catch (err) {
      console.error('[MemeController] Error en proxy de imagen:', err);
      throw new InternalServerErrorException(
        'No se pudo obtener la imagen para generar el meme',
      );
    }
  }
}

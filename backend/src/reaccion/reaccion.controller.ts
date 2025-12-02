import {
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { CreateReaccionDto } from './dto/create-reaccion.dto';

@Controller('memes')
export class ReaccionController {
  constructor(
    @Inject('MEME_SERVICE') private readonly memeClient: ClientProxy,
    @Inject('MEME_MIRROR_SERVICE')
    private readonly memeMirrorClient: ClientProxy,
  ) {}

  private async sendWithFallback<T>(
    pattern: string,
    payload?: unknown,
  ): Promise<T> {
    try {
      const result = await firstValueFrom(
        this.memeClient.send<T>(pattern, payload).pipe(timeout(3000)),
      );
      console.log(
        `[ReaccionController] Microservicio principal OK (pattern: ${pattern})`,
      );
      return result;
    } catch (error) {
      try {
        const mirrorResult = await firstValueFrom(
          this.memeMirrorClient.send<T>(pattern, payload).pipe(timeout(3000)),
        );
        console.log(
          `[ReaccionController] Microservicio espejo OK (pattern: ${pattern})`,
        );
        return mirrorResult;
      } catch (mirrorError) {
        throw new InternalServerErrorException(
          'No se pudo procesar la reacción',
        );
      }
    }
  }

  @Post('react')
  react(@Body() dto: CreateReaccionDto) {
    return this.sendWithFallback('react-meme', dto);
  }
}

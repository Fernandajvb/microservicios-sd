import { Injectable } from '@nestjs/common';

@Injectable()
export class MemesService {
  getHello(): string {
    return 'Hello World!';
  }
}

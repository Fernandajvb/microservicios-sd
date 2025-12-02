import { Injectable } from '@nestjs/common';

@Injectable()
export class MemesMirrorService {
  getHello(): string {
    return 'Hello World!';
  }
}

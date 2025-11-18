import { Injectable } from '@nestjs/common';

@Injectable()
export class MemeServiceMirrorService {
  getHello(): string {
    return 'Hello World!';
  }
}

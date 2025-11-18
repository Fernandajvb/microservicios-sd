import { Injectable } from '@nestjs/common';

@Injectable()
export class MemeServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}

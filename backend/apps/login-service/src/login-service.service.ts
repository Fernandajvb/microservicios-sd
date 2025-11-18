import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}

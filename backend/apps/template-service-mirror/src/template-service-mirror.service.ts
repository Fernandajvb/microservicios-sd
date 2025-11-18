import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplateServiceMirrorService {
  getHello(): string {
    return 'Hello World!';
  }
}

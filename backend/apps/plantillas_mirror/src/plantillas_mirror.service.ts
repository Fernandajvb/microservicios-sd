import { Injectable } from '@nestjs/common';

@Injectable()
export class PlantillasMirrorService {
  getHello(): string {
    return 'Hello World!';
  }
}

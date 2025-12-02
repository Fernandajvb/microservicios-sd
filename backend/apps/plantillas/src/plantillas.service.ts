import { Injectable } from '@nestjs/common';

@Injectable()
export class PlantillasService {
  getHello(): string {
    return 'Hello World!';
  }
}

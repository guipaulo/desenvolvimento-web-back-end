import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'API Backend pronta para evoluir com NestJS';
  }
}

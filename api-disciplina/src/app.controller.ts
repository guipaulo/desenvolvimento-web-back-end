import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('status')
    getStatus() {
      return {
        disciplina: 'Desenvolvimento web backend',
        modulo: 'Encontro 4',
        status: 'ok',
      };
  }
}

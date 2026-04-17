import { Controller, Get } from '@nestjs/common';
import { TarefasService } from './tarefas.service';

@Controller('tarefas')
export class TarefasController {
    constructor(private readonly tarefasService: TarefasService) {}

    @Get()
    listar() {
        return this.tarefasService.listar();
    }
}

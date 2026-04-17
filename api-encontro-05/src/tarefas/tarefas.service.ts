import { Injectable } from '@nestjs/common';

@Injectable()
export class TarefasService {
    private readonly tarefas = [
        {id: 1, titulo: 'Configurar estrutura modular no NestJS'},
    ];

    listar() {
        return this.tarefas;
    }
}

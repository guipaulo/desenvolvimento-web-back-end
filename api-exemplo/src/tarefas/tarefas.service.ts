import { Injectable } from '@nestjs/common';

@Injectable()
export class TarefasService {
    listar() {
        return [{id: 1, titulo: "Estudar frameworks backend"}];
    }
}

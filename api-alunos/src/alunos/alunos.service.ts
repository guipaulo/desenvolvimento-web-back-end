import { Injectable } from '@nestjs/common';

@Injectable()
export class AlunosService {
    private readonly alunos = [
        {matricula: 20261, nome: "Paulo Guilherme"},
    ];

    listar() {
        return this.alunos;
    }
}

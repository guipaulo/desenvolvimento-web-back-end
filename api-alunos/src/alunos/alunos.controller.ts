import { Controller, Get } from '@nestjs/common';
import { AlunosService } from './alunos.service';

@Controller('alunos')
export class AlunosController {
    constructor(private readonly alunosService: AlunosService) {}

    @Get()
    listar() {
        return this.alunosService.listar();
    }
}

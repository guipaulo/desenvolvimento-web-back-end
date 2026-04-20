import { BadRequestException, Controller, Get, Param, Query, Post, Body, Put, Patch } from '@nestjs/common';
import { AlunosService } from './alunos.service';

@Controller('alunos')
export class AlunosController {
    constructor(private readonly alunosService: AlunosService) {}

    @Get()
    listar(@Query('curso') curso?: string) {
        if(curso) {
            return this.alunosService.listarPorCurso(curso);
        }

        return this.alunosService.listarTodos();
    }

    @Get(':matricula')
    buscarPorMatricula(@Param('matricula') matricula: string) {
        const idMatricula = Number(matricula);

        if(Number.isNaN(idMatricula)) {
            throw new BadRequestException('Parâmetro "matricula" deve ser um número')
        }

        return this.alunosService.buscarPorMatricula(idMatricula);
    }

    @Post()
    criar(
        @Body()
        body: {
            matricula: number;
            nome: string;
            curso: string;
            ativo: boolean;
        },
    ) {
        return this.alunosService.criar(body);
    }

    @Put(':matricula')
    atualizarCompleto(
        @Param('matricula') matricula: string,
        @Body()
        body: {
            nome: string;
            curso: string;
            ativo: boolean;
        },
    ) {
        const matNumero = Number(matricula)
        if(Number.isNaN(matNumero)) {
            throw new BadRequestException('Parâmetro matricula deve ser um número')
        }
        
        return this.alunosService.atualizarCompleto(matNumero, body)
    }

    @Patch(':matricula')
    atualizarParcial(
        @Param('matricula') matricula: string,
        @Body()
        body: {
            nome: string;
            curso: string;
            ativo: boolean;
        },
    ) {
        const idMatricula = Number(matricula)

        if(Number.isNaN(idMatricula)) {
            throw new BadRequestException('Parâmetro "matricula" deve ser um número')
        }

        return this.alunosService.atualizarParcial(idMatricula, body)
    }
}

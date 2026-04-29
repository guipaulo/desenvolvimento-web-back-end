import { BadRequestException, Controller, Get, Param, Query, Post, Body, Put, Patch, Delete } from '@nestjs/common';
import { AlunosService } from './alunos.service';

@Controller('alunos')
export class AlunosController {
    constructor(private readonly alunosService: AlunosService) {}

    @Get()
    listar(@Query('curso') curso?: string,@Query('cpf') cpf?: string) {
        let aluno = this.alunosService.listarTodos()
        const Numerocpf = Number(cpf)

        if(Number.isNaN(Numerocpf)) throw new BadRequestException('Parâmetro "CPF" deve ser número')
            
        if(curso) aluno = aluno.filter(al => al.curso === curso)
        
        if(cpf) aluno = aluno.filter(al => al.cpf === Numerocpf)

        return aluno;
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
            nome: string;
            cpf: number;
            curso: 'Alimentos' | 'Sistemas para Internet' | 'Licenciatura em Quimica';
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
            cpf: number;
            curso: 'Alimentos' | 'Sistemas para Internet' | 'Licenciatura em Quimica';
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
            cpf: number;
            curso: 'Alimentos' | 'Sistemas para Internet' | 'Licenciatura em Quimica';
            ativo: boolean;
        },
    ) {
        const idMatricula = Number(matricula)

        if(Number.isNaN(idMatricula)) {
            throw new BadRequestException('Parâmetro "matricula" deve ser um número')
        }

        return this.alunosService.atualizarParcial(idMatricula, body)
    }

    @Delete(':matricula')
    remover(@Param('matricula')matricula:string) {
        const idMatricula = Number(matricula);

        if(Number.isNaN(idMatricula)) {
            throw new BadRequestException('Parâmetro "matricula" deve ser um número')
        }

        return this.alunosService.remover(idMatricula)
    }
}

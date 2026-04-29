import { Injectable, NotFoundException } from '@nestjs/common';

type Aluno = {
    matricula: number;
    nome: string;
    cpf: number;
    curso: 'Alimentos' | 'Sistemas para Internet' | 'Licenciatura em Quimica';
    ativo: boolean;
}

@Injectable()
export class AlunosService {
    private alunos: Aluno[] = [
        {matricula: 1, nome: 'Paulo Guilherme', cpf: 123456, curso: 'Sistemas para Internet', ativo: true},
        {matricula: 2, nome: 'Lucas Felipe', cpf: 536147, curso: 'Alimentos', ativo: true},
        {matricula: 3, nome: 'José Henrique', cpf: 368741, curso: 'Sistemas para Internet', ativo: false},
        {matricula: 4, nome: 'Icaro Ricardo', cpf: 357159, curso: 'Licenciatura em Quimica', ativo: true}

    ];

    listarTodos() {
        return this.alunos;
    }

    listarPorCurso(curso: string) {
        return this.alunos.filter((al)=> al.curso === curso);
    }

    buscarPorMatricula(matricula: number) {
        const aluno = this.alunos.find((al) => al.matricula === matricula);

        if(!aluno) {
            throw new NotFoundException('Aluno não encontrado!');
        }

        return aluno;
    }

    buscarPorCPF(cpf: number) {
        const aluno = this.alunos.find((al) => al.cpf === cpf)
        if(!aluno) throw new NotFoundException('Não existe aluno com esse CPF')

        return aluno
    }

    criar(dados:Omit<Aluno, 'matricula'>) {
        const novaMat = this.alunos.length > 0 ? Math.max(...this.alunos.map((al)=> al.matricula)) + 1
        : 1;

        const novoAluno: Aluno = {matricula: novaMat, ...dados};
        this.alunos.push(novoAluno);

        return novoAluno;
    }

    atualizarCompleto(matricula: number, dados:Omit<Aluno, 'matricula'>) {
        const mat = this.alunos.findIndex((al)=> al.matricula === matricula);

        if(mat === -1) throw new NotFoundException('Aluno não encontrado');

        const atualizado: Aluno = {matricula, ...dados}
        this.alunos[mat] = atualizado;
        return atualizado;
    }

    atualizarParcial(matricula: number, dados:Partial<Omit<Aluno, 'matricula'>>) {
        const aluno = this.buscarPorMatricula(matricula);
        if (!aluno) {
        throw new NotFoundException('Aluno não encontrado');
    }
        const atualizado = {...aluno, ...dados}
        this.alunos = this.alunos.map((al) => al.matricula === matricula ? atualizado : al);
        return atualizado
    }

    remover(matricula: number) {
        const existe = this.alunos.some((al)=>al.matricula===matricula)

        if(!existe) {
            throw new NotFoundException('Aluno não encontrado')
        }

        const aluno = this.alunos.find((t)=>t.matricula === matricula)!

        this.alunos = this.alunos.filter((al)=>al.matricula !== matricula)

        return {mensagem: `Aluno ${aluno.nome} de ${matricula} removido com sucesso`}

    }
}

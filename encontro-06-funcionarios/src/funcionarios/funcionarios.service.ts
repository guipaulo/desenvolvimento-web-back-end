import { Injectable, NotFoundException } from '@nestjs/common';

type Funcionario = {
    registro: number;
    nome: string;
    cargo: string;
    ativo: boolean;
}

@Injectable()
export class FuncionariosService {
    private funcionarios: Funcionario[] = [
        {registro: 1, nome: 'Paulo Guilherme', cargo: 'Gerente', ativo: true},
        {registro: 2, nome: 'Ellen Mayara', cargo: 'Auxiliar de Suporte', ativo: true},
        {registro: 3, nome: 'Luciano Alexandre', cargo: 'Coordenador de TI', ativo: true}
    ];

    listarTodos() {
        return this.funcionarios;
    }

    listarPorCargo(cargo: string) {
        return this.funcionarios.filter((func) => func.cargo === cargo);
    }

    buscarPorRegistro(registro:number) {
        const funcionario = this.funcionarios.find((func) => func.registro === registro)

        if(!funcionario) {
            throw new NotFoundException('Funcionário não encontrado')
        }

        return funcionario

    }

    criar(dados:Omit<Funcionario, 'registro'>) {
        const novoRegistro = this.funcionarios.length > 0 ? Math.max(...this.funcionarios.map((func) => 
        func.registro)) + 1 : 1

        const novoFuncionario: Funcionario = {registro: novoRegistro, ...dados}

        this.funcionarios.push(novoFuncionario)

        return novoFuncionario
    }

    atualizarCompleto(registro: number, dados: Omit<Funcionario, 'registro'>) {
        const reg = this.funcionarios.findIndex((func) => func.registro === registro)

        if(reg === -1) {
            throw new NotFoundException('Funcionário não encontrado')
        }

        const atualizado: Funcionario = {registro, ...dados}
        this.funcionarios[reg] = atualizado
        return atualizado
    }

    atualizarParcial(registro: number, dados:Partial<Omit<Funcionario, 'registro'>>) {
        const funcionario = this.buscarPorRegistro(registro)

        if(!funcionario) {
            throw new NotFoundException('Funcionário não encontrado')
        }

        const atualizado = {...funcionario, ...dados}
        this.funcionarios = this.funcionarios.map((func)=>func.registro === registro ? atualizado: func)
        return atualizado
    }

    remover(registro: number) {
        const existe = this.funcionarios.some((func) => func.registro === registro)

        if(!existe){
            throw new NotFoundException('Funcionário não encontrado!')
        }

        this.funcionarios = this.funcionarios.filter((func)=> func.registro !== registro)
        return {mensagem: `Funcionário ${registro} removido com sucesso`}
    }
}

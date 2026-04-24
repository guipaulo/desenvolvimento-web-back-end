import { Injectable, NotFoundException } from '@nestjs/common';

type Tarefa = {
    id: number;
    nome: string;
    prioridade: string;
    status: string;
};

@Injectable()
export class TarefasService {
    private tarefas: Tarefa[] = [
        { id: 1, nome: 'Implementar API', prioridade: 'alta', status: 'em andamento' },
        { id: 2, nome: 'Corrigir bugs', prioridade: 'media', status: 'pendente' },
        { id: 3, nome: 'Atualizar documentação', prioridade: 'baixa', status: 'concluida' },
    ];

    listarTodos() {
        return this.tarefas;
    }

    listarPorPrioridade(prioridade: string) {
        return this.tarefas.filter((t) => t.prioridade === prioridade);
    }

    buscarPorStatus(status: string) {
        return this.tarefas.filter((t) => t.status === status);
    }

    buscarPorId(id: number) {
        const tarefa = this.tarefas.find((t) => t.id === id);

        if (!tarefa) {
            throw new NotFoundException('Tarefa não encontrada');
        }

        return tarefa;
    }

    criar(dados: Omit<Tarefa, 'id'>) {
        const ids = this.tarefas.map((t) => t.id);
        const novoId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

        const novaTarefa: Tarefa = {
            id: novoId,
            ...dados,
        };

        this.tarefas.push(novaTarefa);
        return novaTarefa;
    }

    atualizarCompleto(id: number, dados: Omit<Tarefa, 'id'>) {
        const indice = this.tarefas.findIndex((t) => t.id === id);

        if (indice === -1) {
            throw new NotFoundException('Tarefa não encontrada');
        }

        const tarefaAtualizada: Tarefa = {
            id,
            ...dados,
        };

        this.tarefas[indice] = tarefaAtualizada;
        return tarefaAtualizada;
    }

    atualizarParcial(id: number, dados: Partial<Omit<Tarefa, 'id'>>) {
        const tarefa = this.buscarPorId(id);

        const tarefaAtualizada = {
            ...tarefa,
            ...dados,
        };

        this.tarefas = this.tarefas.map((t) =>
            t.id === id ? tarefaAtualizada : t
        );

        return tarefaAtualizada;
    }

    remover(id: number) {
        const existe = this.tarefas.some((t) => t.id === id);

        if (!existe) {
            throw new NotFoundException('Tarefa não encontrada');
        }

        this.tarefas = this.tarefas.filter((t) => t.id !== id);

        return {
            mensagem: `Tarefa ${id} removida com sucesso`,
        };
    }
}
import { BadRequestException, Controller, Get, Query, Param, Post, Body, Put, Patch, Delete } from '@nestjs/common';
import { TarefasService } from './tarefas.service';

@Controller('tarefas')
export class TarefasController {
    constructor(private readonly tarefasService: TarefasService) {}

    @Get()
    listar(
        @Query('prioridade') prioridade?: string,
        @Query('status') status?: string
    ) {
        let lista = this.tarefasService.listarTodos();

        if (prioridade) lista = lista.filter(t => t.prioridade === prioridade);

        if (status) lista = lista.filter(t => t.status === status);

        return lista;
    }

    @Get(':id')
    buscarPorId(@Param('id') id: string) {
        const numeroId = Number(id);

        if (Number.isNaN(numeroId)) throw new BadRequestException('Parâmetro "id" deve ser um número');

        return this.tarefasService.buscarPorId(numeroId);
    }

    @Post()
    criar(
        @Body()
        body: {
            nome: string;
            prioridade: string;
            status: string;
        },
    ) {
        const novaTarefa = this.tarefasService.criar(body);
        return novaTarefa;
    }

    @Put(':id')
    atualizarCompleto(
        @Param('id') id: string,
        @Body()
        body: {
            nome: string;
            prioridade: string;
            status: string;
        },
    ) {
        const numeroId = Number(id);

        if (Number.isNaN(numeroId)) throw new BadRequestException('Parâmetro "id" deve ser um número');

        const tarefaAtualizada = this.tarefasService.atualizarCompleto(numeroId, body);
        return tarefaAtualizada;
    }

    @Patch(':id')
    atualizarParcial(
        @Param('id') id: string,
        @Body()
        body: {
            nome?: string;
            prioridade?: string;
            status?: string;
        },
    ) {
        const numeroId = Number(id);

        if (Number.isNaN(numeroId)) throw new BadRequestException('Parâmetro "id" deve ser um número');

        const tarefa = this.tarefasService.atualizarParcial(numeroId, body);
        return tarefa;
    }

    @Delete(':id')
    remover(@Param('id') id: string) {
        const numeroId = Number(id);

        if (Number.isNaN(numeroId)) throw new BadRequestException('Parâmetro "id" deve ser um número');

        const resultado = this.tarefasService.remover(numeroId);
        return resultado;
    }
}
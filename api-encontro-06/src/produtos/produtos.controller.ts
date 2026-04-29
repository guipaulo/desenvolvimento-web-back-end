import { BadRequestException, Controller, Get, Query, Param, Post, Body, Put, Patch, Delete } from '@nestjs/common';
import { ProdutosService } from './produtos.service';

@Controller('produtos')
export class ProdutosController {
    constructor(private readonly produtosService: ProdutosService) {}

    @Get()
    listar(
        @Query('categoria') categoria?: string,
        @Query('preco') preco?: string
    ) {
        let lista = this.produtosService.listarTodos();

        if (categoria) {
            lista = lista.filter(t => t.categoria === categoria);
        }

        if (preco) {
            lista = lista.filter(t => t.preco > Number(preco));
        }

        return lista;
    }

    @Get(':id')
    buscarPorId(@Param('id') id: string) {
        const numeroId = Number(id);

        if (Number.isNaN(numeroId)) {
            throw new BadRequestException('Parâmetro "id" deve ser numérico');
        }

        return this.produtosService.buscarPorId(numeroId);
    }

    @Post()
    criar(
        @Body()
        body: {
            nome: string;
            categoria: string;
            preco: number;
            ativo: boolean;
        },
    ) {
        const novoProduto = this.produtosService.criar(body);
        return novoProduto;
    }

    @Put(':id')
    atualizarCompleto(
        @Param('id') id: string,
        @Body()
        body: {
            nome: string;
            categoria: string;
            preco: number;
            ativo: boolean;
        },
    ) {
        const numeroId = Number(id);

        if (Number.isNaN(numeroId)) {
            throw new BadRequestException('Parâmetro "id" deve ser numérico');
        }

        const produtoAtualizado = this.produtosService.atualizarCompleto(numeroId, body);
        return produtoAtualizado;
    }

    @Patch(':id')
    atualizarParcial(
        @Param('id') id: string,
        @Body()
        body: {
            nome?: string;
            categoria?: string;
            preco?: number;
            ativo?: boolean;
        },
    ) {
        const numeroId = Number(id);

        if (Number.isNaN(numeroId)) {
            throw new BadRequestException('Parâmetro "id" deve ser numérico');
        }

        const produto = this.produtosService.atualizarParcial(numeroId, body);
        return produto;
    }

    @Delete(':id')
    remover(@Param('id') id: string) {
        const numeroId = Number(id);

        if (Number.isNaN(numeroId)) {
            throw new BadRequestException('Parâmetro "id" deve ser numérico');
        }

        const resultado = this.produtosService.remover(numeroId);
        return resultado;
    }
}
import { BadRequestException, Controller, Get, Query, Param, Post, Body, Put, Patch } from '@nestjs/common';
import { ProdutosService } from './produtos.service';

@Controller('produtos')
export class ProdutosController {
    constructor (private readonly produtosService: ProdutosService) {}

    @Get()
    listar(@Query('categoria') categoria?: string,
    @Query('preco') preco?: string) 
    
    {
        let produtos = this.produtosService.listarTodos();

        if (categoria) {
            produtos = produtos.filter(p => p.categoria === categoria);
        }

        if (preco) {
            const precoNumero = Number(preco)
            if (Number.isNaN(precoNumero)) {
                throw new BadRequestException('Parametro preco deve ser numérico')
            }

            produtos = produtos.filter(p => p.preco > precoNumero)
        }

        return produtos;
    }

    @Get(':id')
    buscarPorId(@Param('id')id: string) {
        const idNumero = Number(id);

        if(Number.isNaN(idNumero)) {
            throw new BadRequestException('Parâmetro "id" deve ser numérico');
        }

        return this.produtosService.buscarPorId(idNumero);
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
        return this.produtosService.criar(body)
    }

    @Put(':id')
    atualizarCompleto(
        @Param('id') id: string,
        @Body()
        body: {
            nome: string,
            categoria: string,
            preco: number,
            ativo: boolean
        },
    ) {
        const idNumero = Number(id);
        if(Number.isNaN(idNumero)) {
            throw new BadRequestException('Parâmetro "id" deve ser numérico');
        }

        return this.produtosService.atualizarCompleto(idNumero, body)
    }

    @Patch(':id')
    atualizarParcial(
        @Param('id') id: string,
        @Body()
        body: {
            nome?: string,
            categoria?: string,
            preco?: number,
            ativo?: boolean,
        },
    )
    {
            const idNumero = Number(id);
            if (Number.isNaN(idNumero)) {
                throw new BadRequestException('Parâmetro "id" deve ser numérico')
            }
            return this.produtosService.atualizarParcial(idNumero, body);
    }
}

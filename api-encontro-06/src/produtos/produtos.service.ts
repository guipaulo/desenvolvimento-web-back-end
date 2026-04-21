import { Injectable, NotFoundException } from '@nestjs/common';

    type Produto = {
        id: number;
        nome: string;
        categoria: string;
        preco: number;
        ativo: boolean;
    };

@Injectable()
export class ProdutosService {
    private produtos: Produto[] = [
        { id: 1, nome: 'Notebook', categoria: 'hardware', preco: 3500, ativo: true },
        { id: 2, nome: 'Mouse', categoria: 'hardware', preco: 120, ativo: true},
        {id: 3, nome: 'Curso NestJS', categoria: 'educacao', preco: 89, ativo: false},
    ];

    listarPorCategoria(categoria:string) {
        return this.produtos.filter((p)=> p.categoria === categoria);
    }

    listarTodos() {
        return this.produtos
    }

    buscarPorId(id: number) {
        const produto = this.produtos.find((p) => p.id === id);

        if(!produto) {
            throw new NotFoundException('Produto não encontrado')
        }

        return produto;
    }

    buscarPorPreco(preco: number) {

        return this.produtos.filter((p) => p.preco > preco)
    }

    criar(dados: Omit<Produto, 'id'>) {
        const novoId = this.produtos.length > 0 ? Math.max(...this.produtos.map((p) => p.id)) + 1: 1;

        const novoProduto: Produto = {id: novoId, ...dados};
        this.produtos.push(novoProduto);

        return novoProduto;
    }

    atualizarCompleto(id: number, dados: Omit<Produto, 'id'>) {
        const indice = this.produtos.findIndex((p) =>p.id === id);
        if (indice === -1) {
            throw new NotFoundException('Produto não encontrado');
        }

        const atualizado: Produto = {id, ...dados}
        this.produtos[indice] = atualizado;
        return atualizado;
    }

    atualizarParcial(id: number,dados: Partial<Omit<Produto, 'id'>>) {
        const produto = this.buscarPorId(id);
        const atualizado = {...produto, ...dados};

        this.produtos = this.produtos.map((p)=>(p.id === id ? atualizado : p));
        return atualizado;
    }

    remover(id: number) {
        const existe = this.produtos.some((p)=>p.id === id)

        if(!existe) {
            throw new NotFoundException('Produto não encontrado')
        }

        this.produtos = this.produtos.filter((p)=> p.id !== id)
        return {mensagem: `Produto ${id} removido com sucesso`}
    }
}

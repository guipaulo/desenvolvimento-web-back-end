import { Injectable } from '@nestjs/common';
type itemPedido = 
{
    idProduto: number,
    quantidade: number,
    precoProduto: number,
}
type Pedido = 
{
    id: number,
    itens: itemPedido[],
    total: number,
    status: 'pago' | 'pendente'
}

@Injectable()
export class PedidosService {
    private pedidos: Pedido[] = [
        {id: 1, itens: [{idProduto: 1, quantidade: 2, precoProduto: 10}], 
        total: 20, status: 'pago'},
        {id: 2, itens: [{idProduto: 2, quantidade: 5, precoProduto: 10}],
        total: 50, status: 'pendente'},
        {id: 3, itens:[{idProduto: 3, quantidade: 10, precoProduto: 100}],
        total: 1000, status: 'pago'}

    ]

    
}

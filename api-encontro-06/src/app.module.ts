import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './produtos/produtos.module';
import { PedidosService } from './pedidos/pedidos.service';
import { PedidosController } from './pedidos/pedidos.controller';

@Module({
  imports: [ProdutosModule],
  controllers: [AppController, PedidosController],
  providers: [AppService, PedidosService],
})
export class AppModule {}

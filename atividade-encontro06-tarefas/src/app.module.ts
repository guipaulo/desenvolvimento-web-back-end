import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TarefasService } from './tarefas/tarefas.service';
import { TarefasModule } from './tarefas/tarefas.module';
import { TarefasController } from './tarefas/tarefas.controller';
import { TarefasService } from './tarefas/tarefas.service';

@Module({
  imports: [TarefasModule],
  controllers: [AppController, TarefasController],
  providers: [AppService, TarefasService],
})
export class AppModule {}

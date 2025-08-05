import { Module } from '@nestjs/common';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { MultiEmbarcadorModule } from '../multiembarcador/multiembarcador.module';

@Module({
  imports: [MultiEmbarcadorModule],
  controllers: [PedidosController],
  providers: [PedidosService],
  exports: [PedidosService],
})
export class PedidosModule {}
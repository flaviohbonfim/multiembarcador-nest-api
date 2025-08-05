import { Module } from '@nestjs/common';
import { NotasController } from './notas.controller';
import { NotasService } from './notas.service';
import { MultiEmbarcadorModule } from '../multiembarcador/multiembarcador.module';

@Module({
  imports: [MultiEmbarcadorModule],
  controllers: [NotasController],
  providers: [NotasService],
  exports: [NotasService],
})
export class NotasModule {}
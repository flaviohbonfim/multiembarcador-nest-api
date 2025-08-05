import { Module } from '@nestjs/common';
import { CargasController } from './cargas.controller';
import { CargasService } from './cargas.service';
import { MultiEmbarcadorModule } from '../multiembarcador/multiembarcador.module';

@Module({
  imports: [MultiEmbarcadorModule],
  controllers: [CargasController],
  providers: [CargasService],
  exports: [CargasService],
})
export class CargasModule {}

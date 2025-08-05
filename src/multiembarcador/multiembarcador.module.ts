import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MultiEmbarcadorService } from './multiembarcador.service';

@Module({
  imports: [ConfigModule],
  providers: [MultiEmbarcadorService],
  exports: [MultiEmbarcadorService],
})
export class MultiEmbarcadorModule {}
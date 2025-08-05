import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CargasModule } from './cargas/cargas.module';
import { NotasModule } from './notas/notas.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { MultiEmbarcadorModule } from './multiembarcador/multiembarcador.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigModule disponível globalmente
      envFilePath: '.env', // Define o caminho para o arquivo .env
    }),
    CargasModule,
    NotasModule,
    PedidosModule,
    MultiEmbarcadorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
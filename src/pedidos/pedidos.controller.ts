import { Controller, Get, Post, Body, Param, BadRequestException, Headers as NestHeaders } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import type { Pedido } from '../models/pedido.model';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Get('protocolo/:protocoloPedido')
  async consultarPedidosPorProtocolo(
    @NestHeaders('baseUrl') baseUrl: string,
    @NestHeaders('token') token: string,
    @Param('protocoloPedido') protocoloPedido: number,
  ): Promise<Pedido | string> {
    if (!baseUrl || !token) {
      throw new BadRequestException("Headers 'baseUrl' e 'token' são obrigatórios.");
    }

    const resultado = await this.pedidosService.buscarPedidoPorProtocolo(baseUrl, token, protocoloPedido);
    if (resultado) {
      return resultado;
    }
    throw new BadRequestException('Houve uma falha não identificada');
  }

  @Post('enviar')
  async enviarPedido(
    @NestHeaders('baseUrl') baseUrl: string,
    @NestHeaders('token') token: string,
    @Body() pedido: Pedido,
  ): Promise<any> {
    if (!baseUrl || !token) {
      throw new BadRequestException("Headers 'baseUrl' e 'token' são obrigatórios.");
    }

    const resultado = await this.pedidosService.enviarPedido(baseUrl, token, pedido);
    if (resultado) {
      return resultado;
    }
    throw new BadRequestException('Houve uma falha não identificada');
  }
}

import { Controller, Get, Post, Body, Param, Req, BadRequestException } from '@nestjs/common';
import type { Request } from 'express';
import { PedidosService } from './pedidos.service';
import type { Pedido } from '../models/pedido.model';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Get('protocolo/:protocoloPedido')
  async consultarPedidosPorProtocolo(@Req() req: Request, @Param('protocoloPedido') protocoloPedido: number): Promise<Pedido | string> {
    const baseUrl = req.headers['baseurl'] as string;
    const token = req.headers['token'] as string;

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
  async enviarPedido(@Req() req: Request, @Body() pedido: Pedido): Promise<any> {
    const baseUrl = req.headers['baseurl'] as string;
    const token = req.headers['token'] as string;

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
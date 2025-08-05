import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Pedido } from '../models/pedido.model';
import { MultiEmbarcadorService } from '../multiembarcador/multiembarcador.service';

@Injectable()
export class PedidosService {
  constructor(private readonly multiEmbarcadorService: MultiEmbarcadorService) {}

  async buscarPedidoPorProtocolo(baseUrl: string, token: string, protocoloPedido: number): Promise<Pedido> {
    try {
      // Substituindo a chamada axios pela chamada ao MultiEmbarcadorService
      const payload = { token: token, protocolo: protocoloPedido };
      const response = await this.multiEmbarcadorService.consultarPedidos(payload);
      // Pode ser necessário adaptar a resposta do SOAP para o formato esperado
      return response;
    } catch (error) {
      console.error('Erro ao buscar pedido por protocolo via MultiEmbarcadorService:', error.message);
      throw error;
    }
  }

  async enviarPedido(baseUrl: string, token: string, pedido: Pedido): Promise<any> {
    try {
      const response = await axios.post<any>(`${baseUrl}/api/pedidos/enviar`, pedido, {
        headers: {
          token: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao enviar pedido:', error.message);
      throw error;
    }
  }
}
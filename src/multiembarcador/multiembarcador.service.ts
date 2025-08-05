import * as soap from 'soap';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MultiEmbarcadorService {
  private baseUrl: string;
  private token: string;

  constructor(private configService: ConfigService) {
    const baseUrl = this.configService.get<string>('MULTIEMBARCADOR_BASE_URL');
    if (!baseUrl) {
      throw new Error('MULTIEMBARCADOR_BASE_URL is not defined');
    }
    this.baseUrl = baseUrl;
    const token = this.configService.get<string>('MULTIEMBARCADOR_TOKEN');
    if (!token) {
      throw new Error('MULTIEMBARCADOR_TOKEN is not defined');
    }
    this.token = token;
  }

  private async createSoapClient(serviceName: string): Promise<soap.Client> {
    const wsdlUrl = `${this.baseUrl}/${serviceName}.svc?wsdl`;
    const client = await soap.createClientAsync(wsdlUrl);
    client.addSoapHeader(`<Token xmlns="Token">${this.token}</Token>`);
    return client;
  }

  async consultarCargas(payload: any): Promise<any> {
    const client = await this.createSoapClient('Cargas');
    const [result] = await client.BuscarCargaAsync({ protocolo: { protocoloIntegracaoCarga: payload.protocoloIntegracaoCarga } });
    return result;
  }

  async consultarNotas(payload: any): Promise<any> {
    const client = await this.createSoapClient('NFe');
    const [result] = await client.ConsultarNotasAsync(payload);
    return result;
  }

  async consultarPedidos(payload: any): Promise<any> {
    const client = await this.createSoapClient('Pedidos');
    const [result] = await client.ConsultarPedidosAsync(payload);
    return result;
  }
}
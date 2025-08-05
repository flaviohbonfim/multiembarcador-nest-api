import * as soap from 'soap';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MultiEmbarcadorService {
  constructor() {}


  private async createSoapClient(baseUrl: string, token: string, serviceName: string): Promise<soap.Client> {
    const wsdlUrl = `${baseUrl}/${serviceName}.svc?wsdl`;
    const client = await soap.createClientAsync(wsdlUrl);
    client.addSoapHeader(`<Token xmlns="Token">${token}</Token>`);
    return client;
  }

  async consultarCargas(baseUrl: string, token: string, payload: any): Promise<any> {
    const client = await this.createSoapClient(baseUrl, token, 'Cargas');
    const [result] = await client.BuscarCargaAsync({ protocolo: { protocoloIntegracaoCarga: payload.protocoloIntegracaoCarga } });
    return result;
  }

  async consultarCargasPorNumero(baseUrl: string, token: string, payload: any): Promise<any> {
    const client = await this.createSoapClient(baseUrl, token, 'Cargas');
    const [result] = await client.BuscarCargaPorCodigosIntegracaoAsync({ codigosIntegracao: {
      CodigoIntegracaoFilial: payload.codFilial,
      NumeroCarga: payload.numeroCarga, 
     }
    });
    return result;
  }

  async consultarNotas(baseUrl: string, token: string, payload: any): Promise<any> {
    const client = await this.createSoapClient(baseUrl, token, 'NFe');
    const [result] = await client.ConsultarNotasAsync(payload);
    return result;
  }

  async consultarPedidos(baseUrl: string, token: string, payload: any): Promise<any> {
    const client = await this.createSoapClient(baseUrl, token, 'Pedidos');
    const [result] = await client.ConsultarPedidosAsync(payload);
    return result;
  }
}
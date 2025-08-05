import { Injectable } from '@nestjs/common';

import axios from 'axios';
import { Carregamento } from '../models/carregamento.model';
import { EnviarCargaResponse } from '../models/enviar-carga-response.model';
import { FecharCargaResponse } from '../models/fechar-carga-response.model';
import { MultiEmbarcadorService } from '../multiembarcador/multiembarcador.service';
import { CargasTransformer } from './cargas.transformer';

@Injectable()
export class CargasService {
  constructor(private readonly multiEmbarcadorService: MultiEmbarcadorService) {}

  async enviarCarga(baseUrl: string, token: string, carga: Carregamento): Promise<EnviarCargaResponse> {
    try {
      const response = await axios.post<EnviarCargaResponse>(`${baseUrl}/api/cargas/enviar`, carga, {
        headers: {
          token: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao enviar carga:', error.message);
      throw error;
    }
  }

  async fecharCarga(baseUrl: string, token: string, protocoloCarga: number): Promise<FecharCargaResponse> {
    try {
      const response = await axios.post<FecharCargaResponse>(`${baseUrl}/api/cargas/fechar/${protocoloCarga}`, null, {
        headers: {
          token: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao fechar carga:', error.message);
      throw error;
    }
  }

  async consultarCargasPorProtocolo(baseUrl: string, token: string, protocoloCarga: number, enviarSomentePedidos: boolean = false): Promise<any> {
    try {
      const payload = { protocoloIntegracaoCarga: protocoloCarga };
      const soapResponse = await this.multiEmbarcadorService.consultarCargas(baseUrl, token, payload);
  
      const transformedResponse = CargasTransformer.transformarCargaIntegracao(soapResponse, enviarSomentePedidos);
      return transformedResponse;
    } catch (error) {
      console.error('Erro ao consultar carga por protocolo via MultiEmbarcadorService:', error.message);
      throw error;
    }
  }

  async consultarCargasPorNumero(
    baseUrl: string,
    token: string,
    codFilial: string,
    numeroCarga: string,
    enviarSomentePedidos: boolean,
  ): Promise<any> {
    try {
      const payload = { codFilial, numeroCarga };
      const soapResponse = await this.multiEmbarcadorService.consultarCargasPorNumero(baseUrl, token, payload);
      const transformedResponse = CargasTransformer.transformarCargaIntegracao(soapResponse, enviarSomentePedidos);
      return transformedResponse;
    } catch (error) {
      console.error('Erro ao consultar carga por número:', error.message);
      throw error;
    }
  }
}

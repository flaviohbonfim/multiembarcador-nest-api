import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { BuscarNotasFiscaisResponse } from '../models/buscar-notas-fiscais-response.model';
import { DadosNotaFiscal } from '../models/dados-nota-fiscal.model';
import { EnviarDadosNotasFiscaisResponse } from '../models/enviar-dados-notas-fiscais-response.model';
import { MultiEmbarcadorService } from '../multiembarcador/multiembarcador.service';

@Injectable()
export class NotasService {
  constructor(private readonly multiEmbarcadorService: MultiEmbarcadorService) {}

  async buscarNotasFiscaisVinculadas(baseUrl: string, token: string, protocoloCarga: number): Promise<BuscarNotasFiscaisResponse> {
    try {
      // Substituindo a chamada axios pela chamada ao MultiEmbarcadorService
      const payload = { token: token, protocoloCarga: protocoloCarga }; // Adapte conforme a necessidade do serviço SOAP
      const response = await this.multiEmbarcadorService.consultarNotas(payload);
      // Pode ser necessário adaptar a resposta do SOAP para o formato esperado
      return response;
    } catch (error) {
      console.error('Erro ao buscar notas fiscais vinculadas via MultiEmbarcadorService:', error.message);
      throw error;
    }
  }

  async buscarNotasFiscais(baseUrl: string, token: string, chavesAcesso: string[]): Promise<BuscarNotasFiscaisResponse> {
    try {
      const response = await axios.post<BuscarNotasFiscaisResponse>(`${baseUrl}/api/notas/chave`, { ChavesAcesso: chavesAcesso }, {
        headers: {
          token: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar notas fiscais por chave:', error.message);
      throw error;
    }
  }

  async enviarDadosNotasFiscais(baseUrl: string, token: string, dadosNotas: DadosNotaFiscal[]): Promise<EnviarDadosNotasFiscaisResponse> {
    try {
      const response = await axios.post<EnviarDadosNotasFiscaisResponse>(`${baseUrl}/api/notas/dados`, dadosNotas, {
        headers: {
          token: token,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao enviar dados de notas fiscais:', error.message);
      throw error;
    }
  }
}
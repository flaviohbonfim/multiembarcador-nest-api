import { Controller, Get, Post, Body, Param, BadRequestException, Headers as NestHeaders } from '@nestjs/common';
import { NotasService } from './notas.service';
import type { ConsultarNotasRequest } from '../models/consultar-notas-request.model';
import { DadosNotaFiscal } from '../models/dados-nota-fiscal.model';
import { BuscarNotasFiscaisResponse } from '../models/buscar-notas-fiscais-response.model';
import { EnviarDadosNotasFiscaisResponse } from '../models/enviar-dados-notas-fiscais-response.model';

@Controller('notas')
export class NotasController {
  constructor(private readonly notasService: NotasService) {}

  @Get('protocolo/:protocoloCarga')
  async consultarNotaPorProtocolo(
    @NestHeaders('baseUrl') baseUrl: string,
    @NestHeaders('token') token: string,
    @Param('protocoloCarga') protocoloCarga: number,
  ): Promise<BuscarNotasFiscaisResponse | string> {
    if (!baseUrl || !token) {
      throw new BadRequestException("Headers 'baseUrl' e 'token' são obrigatórios.");
    }

    const resultado = await this.notasService.buscarNotasFiscaisVinculadas(baseUrl, token, protocoloCarga);
    if (resultado) {
      return resultado;
    }
    throw new BadRequestException('Houve uma falha não identificada');
  }

  @Post('chave')
  async consultarNotasPorChavesAcesso(
    @NestHeaders('baseUrl') baseUrl: string,
    @NestHeaders('token') token: string,
    @Body() requestBody: ConsultarNotasRequest,
  ): Promise<BuscarNotasFiscaisResponse | string> {
    if (!baseUrl || !token) {
      throw new BadRequestException("Headers 'baseUrl' e 'token' são obrigatórios.");
    }

    const resultado = await this.notasService.buscarNotasFiscais(baseUrl, token, requestBody.ChavesAcesso);
    if (resultado) {
      return resultado;
    }
    throw new BadRequestException('Houve uma falha não identificada');
  }

  @Post('dados')
  async enviarDadosNotaFiscal(
    @NestHeaders('baseUrl') baseUrl: string,
    @NestHeaders('token') token: string,
    @Body() requestBody: DadosNotaFiscal[],
  ): Promise<EnviarDadosNotasFiscaisResponse | string> {
    if (!baseUrl || !token) {
      throw new BadRequestException("Headers 'baseUrl' e 'token' são obrigatórios.");
    }

    const resultado = await this.notasService.enviarDadosNotasFiscais(baseUrl, token, requestBody);
    if (resultado) {
      return resultado;
    }
    throw new BadRequestException('Houve uma falha não identificada');
  }
}
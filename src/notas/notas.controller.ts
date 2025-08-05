import { Controller, Get, Post, Body, Param, Req, BadRequestException } from '@nestjs/common';
import type { Request } from 'express';
import { NotasService } from './notas.service';
import type { ConsultarNotasRequest } from '../models/consultar-notas-request.model';
import { DadosNotaFiscal } from '../models/dados-nota-fiscal.model';
import { BuscarNotasFiscaisResponse } from '../models/buscar-notas-fiscais-response.model';
import { EnviarDadosNotasFiscaisResponse } from '../models/enviar-dados-notas-fiscais-response.model';

@Controller('notas')
export class NotasController {
  constructor(private readonly notasService: NotasService) {}

  @Get('protocolo/:protocoloCarga')
  async consultarNotaPorProtocolo(@Req() req: Request, @Param('protocoloCarga') protocoloCarga: number): Promise<BuscarNotasFiscaisResponse | string> {
    const baseUrl = req.headers['baseurl'] as string;
    const token = req.headers['token'] as string;

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
  async consultarNotasPorChavesAcesso(@Req() req: Request, @Body() requestBody: ConsultarNotasRequest): Promise<BuscarNotasFiscaisResponse | string> {
    const baseUrl = req.headers['baseurl'] as string;
    const token = req.headers['token'] as string;

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
  async enviarDadosNotaFiscal(@Req() req: Request, @Body() requestBody: DadosNotaFiscal[]): Promise<EnviarDadosNotasFiscaisResponse | string> {
    const baseUrl = req.headers['baseurl'] as string;
    const token = req.headers['token'] as string;

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
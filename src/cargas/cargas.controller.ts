import { Controller, Post, Get, Delete, Body, Param, Query, Req, BadRequestException, NotFoundException, Headers as NestHeaders } from '@nestjs/common';
import type { Request } from 'express';
import { CargasService } from './cargas.service';
import type { Carregamento } from '../models/carregamento.model';
import { EnviarCargaResponse } from '../models/enviar-carga-response.model';
import { FecharCargaResponse } from '../models/fechar-carga-response.model';

@Controller('cargas')
export class CargasController {
  constructor(private readonly cargasService: CargasService) {}

  @Post('enviar')
  async enviarCarga(
    @NestHeaders('baseUrl') baseUrl: string,
    @NestHeaders('token') token: string,
    @Body() carga: Carregamento): Promise<EnviarCargaResponse> {

    if (!baseUrl || !token) {
      throw new BadRequestException("Headers 'baseUrl' e 'token' são obrigatórios.");
    }

    const resultado = await this.cargasService.enviarCarga(baseUrl, token, carga);
    if (resultado) {
      return resultado;
    }
    throw new BadRequestException('Houve uma falha não identificada');
  }

  @Post('fechar/:protocoloCarga')
  async fecharCarga(
    @NestHeaders('baseUrl') baseUrl: string,
    @NestHeaders('token') token: string,
    @Param('protocoloCarga') protocoloCarga: number): Promise<FecharCargaResponse> {
    if (!baseUrl || !token) {
      throw new BadRequestException("Headers 'baseUrl' e 'token' são obrigatórios.");
    }

    const resultado = await this.cargasService.fecharCarga(baseUrl, token, protocoloCarga);
    if (resultado) {
      return resultado;
    }
    throw new BadRequestException('Houve uma falha não identificada');
  }

  @Get('protocolo/:protocoloCarga')
  async consultarCargasPorProtocolo(
    @NestHeaders('baseUrl') baseUrl: string,
    @NestHeaders('token') token: string,
    @Param('protocoloCarga') protocoloCarga: number,
    @Query('enviarSomentePedidos') enviarSomentePedidos: boolean = false,
  ) {
    if (!baseUrl || !token) {
      throw new BadRequestException('Headers baseUrl and token are required.');
    }
    const resultado = await this.cargasService.consultarCargasPorProtocolo(baseUrl, token, protocoloCarga, enviarSomentePedidos);
    if (resultado) {
      return resultado;
    }
    throw new BadRequestException('Houve uma falha não identificada');
  }

  @Get('numero/:codFilial/:numeroCarga')
  async consultarCargasPorNumero(
    @NestHeaders('baseUrl') baseUrl: string,
    @NestHeaders('token') token: string,
    @Param('codFilial') codFilial: string,
    @Param('numeroCarga') numeroCarga: string,
    @Query('enviarSomentePedidos') enviarSomentePedidos: boolean = false,
  ): Promise<any> {
    if (!baseUrl || !token) {
      throw new BadRequestException("Headers 'baseUrl' e 'token' são obrigatórios.");
    }
    const resultado = await this.cargasService.consultarCargasPorNumero(baseUrl, token, codFilial, numeroCarga, enviarSomentePedidos);
    if (resultado) {
      return resultado;
    }
    throw new NotFoundException(`Carga com número ${numeroCarga} não encontrada.`);
  }
}

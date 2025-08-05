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
  async enviarCarga(@Req() req: Request, @Body() carga: Carregamento): Promise<EnviarCargaResponse> {
    const baseUrl = req.headers['baseurl'] as string;
    const token = req.headers['token'] as string;

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
  async fecharCarga(@Req() req: Request, @Param('protocoloCarga') protocoloCarga: number): Promise<FecharCargaResponse> {
    const baseUrl = req.headers['baseurl'] as string;
    const token = req.headers['token'] as string;

    if (!baseUrl || !token) {
      throw new BadRequestException("Headers 'baseUrl' e 'token' são obrigatórios.");
    }

    const resultado = await this.cargasService.fecharCarga(baseUrl, token, protocoloCarga);
    if (resultado) {
      return resultado;
    }
    throw new BadRequestException('Houve uma falha não identificada');
  }

  @Get('pendentes')
  consultarCargasPendentes(@Query('cod_filial') codFilial: string[]): any {
    // Lógica de implementação para consultar cargas pendentes
    return {
      message: 'Cargas pendentes retornadas com sucesso.',
      codFilial: codFilial,
    };
  }

  @Get('pendentes/carregamentos')
  consultarCarregamentosPendentes(@Query('cod_filial') codFilial: string[]): any {
    // Lógica de implementação para consultar carregamentos pendentes
    return {
      message: 'Carregamentos pendentes retornados com sucesso.',
      codFilial: codFilial,
    };
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
    @Req() req: Request,
    @Param('codFilial') codFilial: string,
    @Param('numeroCarga') numeroCarga: string,
    @Query('enviarSomentePedidos') enviarSomentePedidos: boolean = false,
  ): Promise<any> {
    const baseUrl = req.headers['baseurl'] as string;
    const token = req.headers['token'] as string;

    if (!baseUrl || !token) {
      throw new BadRequestException("Headers 'baseUrl' e 'token' são obrigatórios.");
    }

    const resultado = await this.cargasService.consultarCargasPorNumero(baseUrl, token, codFilial, numeroCarga, enviarSomentePedidos);
    if (resultado) {
      return resultado;
    }
    throw new NotFoundException(`Carga com número ${numeroCarga} não encontrada.`);
  }

  @Get('todas')
  consultarTodasCargas(): any {
    // Lógica de consulta geral de cargas
    return {
      message: 'Todas as cargas foram consultadas com sucesso.',
    };
  }

  @Delete('remover/:numeroCarga')
  removerCarga(@Param('numeroCarga') numeroCarga: string): any {
    // Lógica de remoção de carga
    return {
      message: `Carga ${numeroCarga} removida com sucesso.`,
    };
  }
}

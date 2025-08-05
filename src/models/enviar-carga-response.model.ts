import { AdicionarCargaResponse } from './adicionar-carga-response.model';

export interface EnviarCargaResponse {
  NumeroCarga: string;
  NumeroPedido: string;
  Resposta: AdicionarCargaResponse;
}
import { IntegrarNotasFiscaisResponse } from './integrar-notas-fiscais-response.model';

export interface EnviarDadosNotasFiscaisResponse {
  ProtocoloCarga: number;
  ProtocoloPedido: number;
  Resposta: IntegrarNotasFiscaisResponse;
}
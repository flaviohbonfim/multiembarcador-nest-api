export interface EnviarXMLResponse {
  ProtocoloCarga: number;
  ProtocoloPedido: number;
  Token: string;
  StatusToken: boolean;
  MensagemToken: string;
  StatusIntegra: boolean;
  MensagemIntegra: string;
}
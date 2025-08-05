import { Pedido } from './pedido.model';

export interface Carregamento {
  Filial: string;
  NumeroCarga: string | null;
  ProtocoloCarga: number | null;
  Transportador: string | null;
  PlacaVeiculo: string | null;
  TipoVeiculo: string | null;
  CpfMotorista: string | null;
  NomeMotorista: string | null;
  ModeloVeicular: string | null;
  TipoOperacao: string | null;
  Pedidos: Pedido[];
}
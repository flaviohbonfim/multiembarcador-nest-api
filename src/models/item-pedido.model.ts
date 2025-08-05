export interface ItemPedido {
  CodigoProduto: string;
  CodigoGrupoProduto?: string;
  DescricaoGrupoProduto?: string;
  DescricaoProduto: string;
  Quantidade: number;
  PesoUnitario?: number | null;
  ValorUnitario?: number | null;
  MetroCubico?: number;
  UnidadeMedida?: string | null;
  PesoBruto?: number | null;
  PesoLiquido?: number | null;
  Valor?: number | null;
  ValorTotal?: number | null;
  Volume?: number | null;
  Altura?: number | null;
  Largura?: number | null;
  Comprimento?: number | null;
  Cubagem?: number | null;
  OrdemItem?: number | null;
  TipoItem?: string | null;
  Observacao?: string | null;
}
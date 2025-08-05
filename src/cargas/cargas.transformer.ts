import { Carregamento } from '../models/carregamento.model';
import { ItemPedido } from '../models/item-pedido.model';
import { Pedido } from '../models/pedido.model';

// Interfaces alinhadas com a estrutura esperada pelo código C#
interface ProdutoSoap {
  CodigoProduto?: string;
  CodigoGrupoProduto?: string;
  DescricaoGrupoProduto?: string;
  DescricaoProduto?: string;
  Quantidade?: number;
  PesoUnitario?: number;
  ValorUnitario?: number;
  MetroCubito?: number;
}

interface CargaIntegracaoSoap {
  NumeroCarga?: string | null;
  Filial?: { CodigoIntegracao: string };
  ProtocoloCarga?: number | null;
  Motoristas?: Array<{ CPF: string; Nome: string }>;
  ModeloVeicular?: { CodigoIntegracao: string };
  Veiculo?: { Placa: string; TipoVeiculo: string };
  TipoOperacao?: { CodigoIntegracao: string };
  TransportadoraEmitente?: { CNPJ: string };
  NumeroPedidoEmbarcador?: string | null;
  ProtocoloPedido?: number;
  CodigoIntegracaoRota?: string | null;
  DataInicioCarregamento?: string | null;
  DataPrevisaoEntrega?: string | null;
  Observacao?: string | null;
  OrdemEntrega?: number;
  PesoBruto?: number;
  TipoCargaEmbarcador?: { CodigoIntegracao: string };
  TipoPedido?: string | null;
  Vendedor?: string | null;
  Remetente?: {
    CPFCNPJ: string;
    RGIE: string;
    RazaoSocial: string;
    NomeFantasia: string;
    Endereco: {
      Bairro: string;
      CEP: string;
      Logradouro: string;
      Numero: string;
      Cidade: { Descricao: string; IBGE: number; SiglaUF?: string };
    };
  };
  Destinatario?: {
    CPFCNPJ: string;
    RGIE: string;
    RazaoSocial: string;
    NomeFantasia: string;
    Endereco: {
      Bairro: string;
      CEP: string;
      Logradouro: string;
      Numero: string;
      Cidade: { Descricao: string; IBGE: number; SiglaUF?: string };
    };
  };
  Produtos?: ProdutoSoap[] | ProdutoSoap;
}

export class CargasTransformer {
  private static transformarItemPedido(produto: ProdutoSoap): ItemPedido {
    // O modelo ItemPedido em TS não possui todos os campos do C# (ex: MetroCubico).
    // Adicione os campos faltantes ao seu `item-pedido.model.ts` se necessário.
    return {
      CodigoProduto: produto.CodigoProduto ?? '',
      DescricaoProduto: produto.DescricaoProduto ?? '',
      Quantidade: produto.Quantidade ?? 0,
      UnidadeMedida: null,
      PesoBruto: produto.PesoUnitario ?? null,
      PesoLiquido: null,
      Valor: produto.ValorUnitario ?? null,
      ValorTotal: (produto.Quantidade ?? 0) * (produto.ValorUnitario ?? 0),
      Volume: produto.MetroCubito ?? null,
      Altura: null,
      Largura: null,
      Comprimento: null,
      Cubagem: produto.MetroCubito ?? null,
      OrdemItem: null,
      TipoItem: null,
      Observacao: null,
    };
  }

  private static transformarParaPedido(p: CargaIntegracaoSoap): Pedido {
    const produtos = p.Produtos;
    let produtosArray: ProdutoSoap[] = [];

    if (produtos) {
      if (Array.isArray(produtos)) {
        produtosArray = produtos;
      } else if (typeof produtos === 'object' && 'Produto' in produtos) {
        // Handle case where 'Produtos' is an object with a 'Produto' key containing the array
        produtosArray = Array.isArray(produtos.Produto) ? produtos.Produto : [produtos.Produto];
      } else {
        produtosArray = [produtos];
      }
    }

    return {
      CodFilial: p.Filial?.CodigoIntegracao || '',
      NumeroPedidoEmbarcador: p.NumeroPedidoEmbarcador || null,
      ProtocoloPedido: p.ProtocoloPedido || 0,
      CodigoRota: p.CodigoIntegracaoRota || null,
      DataInicioCarregamento: p.DataInicioCarregamento || null,
      DataPrevisaoEntrega: p.DataPrevisaoEntrega || null,
      Observacao: p.Observacao || null,
      OrdemEntrega: p.OrdemEntrega || 0,
      PesoBruto: p.PesoBruto || 0,
      TipoCarga: p.TipoCargaEmbarcador?.CodigoIntegracao || null,
      TipoOperacao: p.TipoOperacao?.CodigoIntegracao || null,
      TipoPedido: String(p.TipoPedido) || null,
      Vendedor: p.Vendedor || null,
      ExpedidorBairro: p.Remetente?.Endereco?.Bairro || null,
      ExpedidorCep: p.Remetente?.Endereco?.CEP || null,
      ExpedidorCidade: p.Remetente?.Endereco?.Cidade?.Descricao || null,
      ExpedidorCnpj: p.Remetente?.CPFCNPJ || null,
      ExpedidorDescricao: p.Remetente?.NomeFantasia || null,
      ExpedidorEndereco: p.Remetente?.Endereco?.Logradouro || null,
      ExpedidorEstado: p.Remetente?.Endereco?.Cidade?.SiglaUF || null,
      ExpedidorIbge: p.Remetente?.Endereco?.Cidade?.IBGE || 0,
      ExpedidorIe: p.Remetente?.RGIE || null,
      ExpedidorLogradouro: p.Remetente?.Endereco?.Logradouro || null,
      ExpedidorNumero: p.Remetente?.Endereco?.Numero || null,
      ExpedidorRazaoSocial: p.Remetente?.RazaoSocial || null,
      RecebedorBairro: p.Destinatario?.Endereco?.Bairro || null,
      RecebedorCep: p.Destinatario?.Endereco?.CEP || null,
      RecebedorCidade: p.Destinatario?.Endereco?.Cidade?.Descricao || null,
      RecebedorCnpj: p.Destinatario?.CPFCNPJ || null,
      RecebedorDescricao: p.Destinatario?.NomeFantasia || null,
      RecebedorEndereco: p.Destinatario?.Endereco?.Logradouro || null,
      RecebedorEstado: p.Destinatario?.Endereco?.Cidade?.SiglaUF || null,
      RecebedorIbge: p.Destinatario?.Endereco?.Cidade?.IBGE || 0,
      RecebedorIe: p.Destinatario?.RGIE || null,
      RecebedorLogradouro: p.Destinatario?.Endereco?.Logradouro || null,
      RecebedorNumero: p.Destinatario?.Endereco?.Numero || null,
      RecebedorRazaoSocial: p.Destinatario?.RazaoSocial || null,
      ItensPedido: produtosArray.map(this.transformarItemPedido),
    };
  }

  static transformarCargaIntegracao(soapResponse: any, enviarSomentePedidos: boolean = false): Carregamento | null {
    // A resposta SOAP já vem tratada do service, contendo o objeto de resultado principal.
    // Ex: { BuscarCargaResult: { Objeto: [...] } }
    const buscarCargaResult = soapResponse?.BuscarCargaResult;
    if (!buscarCargaResult?.Objeto) {
      return null;
    }

    // A propriedade 'Objeto' pode ser um objeto único ou um array.
    // Normalizamos para sempre ser um array para um tratamento consistente.
    const objetosCarga = buscarCargaResult?.Objeto.CargaIntegracao;
    const cargaIntegracaoSoapObjects: CargaIntegracaoSoap[] = Array.isArray(objetosCarga) ? objetosCarga : [objetosCarga];

    if (cargaIntegracaoSoapObjects.length === 0) {
      return null;
    }

    const firstLinha: CargaIntegracaoSoap = cargaIntegracaoSoapObjects[0];
    
    // Mapeamento dos campos do JSON para a interface CargaIntegracaoSoap
    // Ajustar conforme a estrutura real do JSON e a necessidade do C#
    // Exemplo: firstLinha.Filial?.CodigoIntegracao pode vir de firstLinha.Filial[0].CodigoIntegracao
    // ou firstLinha.Filial.CodigoIntegracao[0] dependendo da estrutura do XML/JSON
    // É crucial verificar a estrutura exata do JSON para cada campo.

    const carregamento: Carregamento = {
      // Lógica condicional baseada em 'enviarSomentePedidos'
      NumeroCarga: enviarSomentePedidos ? null : firstLinha.NumeroCarga || null,
      Filial: firstLinha.Filial?.CodigoIntegracao ?? '',
      ProtocoloCarga: enviarSomentePedidos ? null : firstLinha.ProtocoloCarga || null,
      CpfMotorista: enviarSomentePedidos ? null : firstLinha.Motoristas?.[0]?.CPF ?? null,
      NomeMotorista: enviarSomentePedidos ? null : firstLinha.Motoristas?.[0]?.Nome ?? null,
      ModeloVeicular: enviarSomentePedidos ? null : firstLinha.ModeloVeicular?.CodigoIntegracao || null,
      PlacaVeiculo: enviarSomentePedidos ? null : firstLinha.Veiculo?.Placa || null,
      TipoOperacao: enviarSomentePedidos ? null : firstLinha.TipoOperacao?.CodigoIntegracao || null,
      TipoVeiculo: enviarSomentePedidos ? null : firstLinha.Veiculo?.TipoVeiculo ?? null,
      Transportador: enviarSomentePedidos ? null : firstLinha.TransportadoraEmitente?.CNPJ || null,
      // A criação de Pedidos itera sobre a lista completa, como no C#
      Pedidos: cargaIntegracaoSoapObjects.map((p) => this.transformarParaPedido(p)),
    };
    return carregamento;
  }

}
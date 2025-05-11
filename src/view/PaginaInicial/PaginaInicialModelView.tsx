import api from "../../services/api";

const formatDecimal = (value: number) => parseFloat(value.toFixed(2));

interface ProdutoData {
  nome_produto: string;
  mesExt: string;
  nu_quantidade: number;
  vr_total: number;
}

interface TotalData {
  mesExt: string;
  nu_quantidade: number;
  vr_total: number;
}

interface ChartData {
  seriesQtd: { name: string; data: number[] }[];
  categoriesQtd: string[];
  totalQtd: { x: string; y: number }[];
  seriesVr: { name: string; data: number[] }[];
  categoriesVr: string[];
  totalVr: { x: string; y: number }[];
}

export const getNexSixMonths = async (setCompra: any, setVenda: any, setEstoque: any, limit: number) => {
  try {
    const response = await api.get(limit ? `/BI/getnextSixMonths?limit=${limit}` : '/BI/getnextSixMonths');

    if (response?.data?.result !== 'success') {
      throw new Error(response?.data?.message ?? 'Erro ao tentar buscar os Dados');
    }

    const data = response.data.data;
    const meses:Array<any> = Array.from(new Set(data.compra.map((item: ProdutoData) => item.mesExt)));

    const processProdutos = (produtos: ProdutoData[]) => {
      const produtosUnicos = Array.from(new Set(produtos.map(item => item.nome_produto)));
      
      return produtosUnicos.map(nome => {
        const dadosProduto = produtos.filter(item => item.nome_produto === nome);
        return {
          name: nome,
          data: meses.map(mes => {
            const item = dadosProduto.find(d => d.mesExt === mes);
            return item ? Number(item.nu_quantidade) : 0;
          })
        };
      });
    };

    const processValores = (produtos: ProdutoData[]) => {
      const produtosUnicos = Array.from(new Set(produtos.map(item => item.nome_produto)));
      
      return produtosUnicos.map(nome => {
        const dadosProduto = produtos.filter(item => item.nome_produto === nome);
        return {
          name: nome,
          data: meses.map(mes => {
            const item = dadosProduto.find(d => d.mesExt === mes);
            return item ? formatDecimal(item.vr_total) : 0;
          })
        };
      });
    };

    const processTotais = (totais: TotalData[], field: 'nu_quantidade' | 'vr_total') => {
      return meses.map(mes => {
        const item = totais.find(t => t.mesExt === mes);
        return {
          x: mes,
          y: item ? (field === 'vr_total' ? formatDecimal(item[field]) : Number(item[field])) : 0
        };
      });
    };

    const compra: ChartData = {
      seriesQtd: processProdutos(data.compra),
      categoriesQtd: meses,
      totalQtd: processTotais(data.total_compra, 'nu_quantidade'),
      seriesVr: processValores(data.compra),
      categoriesVr: meses,
      totalVr: processTotais(data.total_compra, 'vr_total')
    };

    const venda: ChartData = {
      seriesQtd: processProdutos(data.venda),
      categoriesQtd: meses,
      totalQtd: processTotais(data.total_venda, 'nu_quantidade'),
      seriesVr: processValores(data.venda),
      categoriesVr: meses,
      totalVr: processTotais(data.total_venda, 'vr_total')
    };

    const estoque: ChartData = {
      seriesQtd: processProdutos(data.estoque),
      categoriesQtd: meses,
      totalQtd: processTotais(data.total_estoque, 'nu_quantidade'),
      seriesVr: processValores(data.estoque),
      categoriesVr: meses,
      totalVr: processTotais(data.total_estoque, 'vr_total')
    };

    setCompra(compra);
    setVenda(venda);
    setEstoque(estoque);

    return {
      success: true,
      message: 'Dados carregados com sucesso'
    };

  } catch (error: any) {
    console.error('Erro ao buscar dados:', error);
    return {
      success: false,
      message: error?.message ?? 'Erro ao tentar buscar os Dados'
    };
  }
};
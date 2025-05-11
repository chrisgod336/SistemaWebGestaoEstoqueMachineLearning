import api from "../../services/api";
import { maskDinheiro } from "../../utils/Mask";

export const getNexSixMonths = async (setCompra: any, setVenda: any, setEstoque: any, limit: number) => {
  try {
    const response = await api.get(limit ? `/BI/getnextSixMonths?limit=${limit}` : '/BI/getnextSixMonths');

    if (response?.data?.result !== 'success') {
      throw new Error(response?.data?.message ?? 'Erro ao tentar buscar os Dados');
    }

    const data = response.data.data;

    const ProcessaDados = (data:any) => {
        return data.map((element:any) => {
            return {
                'Período': `${element.mesExt}/${element.ano}`,
                'Produto': `${element.id_produto} - ${element.nome_produto}`,
                'Quantidade': element.nu_quantidade,
                'Valor Total': maskDinheiro(element.vr_total)
            }
        }) 
    }

    const compra = ProcessaDados(data?.compra)||[];
    const venda = ProcessaDados(data?.venda)||[];
    const estoque = ProcessaDados(data?.estoque)||[];

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
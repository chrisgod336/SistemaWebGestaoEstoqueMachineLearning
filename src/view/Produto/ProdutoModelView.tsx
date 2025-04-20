import api from "../../services/api";

import { maskDinheiro } from "../../utils/Mask";

const arrayFormatt = (arr:any) => {
    const formattedArray = arr.map((item:any) => {
        return {
            "Código": item.id_produto,
            "Código Fonecedor": item.id_fornecedor,
            "Descrição": item.tx_nome,
            "Marca": item.tx_marca,
            "Valor de Compra": maskDinheiro(item.vr_preco_compra),
            "Valor de Venda": maskDinheiro(item.vr_preco_venda)
        }
    })

    return formattedArray;
}

const getAllProduto = async (setProdutos:any) => {
    try {
        const response:any = await api.get('/produto/buscar');

        if(response?.data?.result === 'success' && response?.data?.data){
            setProdutos(arrayFormatt(response.data?.data));
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar buscar os Produtos')
        }
    }catch(error:any){
        console.log(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar buscar os Produtos'
        }
    }
}

export {getAllProduto}
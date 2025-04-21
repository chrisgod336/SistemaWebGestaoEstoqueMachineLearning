import api from "../../services/api";
import { maskDinheiro,unmaskValor } from "../../utils/Mask";

const arrayFormatt = (arr:any) => {
    if(!arr || !arr.length) return {};
    const formattedArray = arr.map((item:any) => {
        return {
            "Código": item.id_produto,
            "Fonecedor": item.fornecedor,
            "Descrição": item.tx_nome,
            "Marca": item.tx_marca,
            "Valor de Compra": maskDinheiro(item.vr_preco_compra),
            "Valor de Venda": maskDinheiro(item.vr_preco_venda)
        }
    })

    return formattedArray;
}

export const getAllProduto = async (setProdutos:any) => {
    try {
        const response:any = await api.get('/produto/buscar');

        if(response?.data?.result === 'success'){
            setProdutos(arrayFormatt(response.data?.data));
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar buscar os Produtos')
        }
    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar buscar os Produtos'
        }
    }
}

export const createProduto = async (produtoData: any) => {
    try {

        const body = {
            id_fornecedor: produtoData.id_fornecedor,
            tx_nome: produtoData.tx_nome,
            tx_marca: produtoData.tx_marca??'',
            vr_preco_compra: unmaskValor(produtoData.vr_preco_compra),
            vr_preco_venda: unmaskValor(produtoData.vr_preco_venda)
        }

        const response:any = await api.post('/produto/criar', body);

        if (response?.data?.result === 'success') {
            return {
                success: true,
                message: 'Produto cadastrado com sucesso.',
                id: response.data.data.id_produto
            }
        }else{
            console.error(response?.data?.message); 
            throw new Error(response?.data?.message ?? 'Erro ao tentar criar Produto');
        }

    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar criar Produto'
        }
    }
}

export const getProduto = async (id_produto: string) => {
    try {
        const response:any = await api.get(`/produto/buscar?id_produto=${id_produto}`);
        if(response?.data?.result === 'success' && response?.data?.data[0]){
            return response?.data?.data[0];
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar buscar o Produto')
        }
    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar buscar o Produto'
        }
    }
}

export const deleteProduto = async (id_produto: string) => {
    try {
        const response:any = await api.delete(`/produto/deletar?id_produto=${id_produto}`);
        if(response?.data?.result === 'success'){
            return {
                success: true,
                message: response?.data?.message??'Produto deletado com sucesso.'
            };
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar deletar o Produto')
        }
    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar deletar o Produto'
        }
    }
}

export const putProduto = async (produtoData: any) => {
    try {

        const body = {
            id_produto: Number(produtoData.id_produto), 
            id_fornecedor: produtoData.id_fornecedor,
            tx_nome: produtoData.tx_nome,
            tx_marca: produtoData.tx_marca??'',
            vr_preco_compra: unmaskValor(produtoData.vr_preco_compra),
            vr_preco_venda: unmaskValor(produtoData.vr_preco_venda)
        }

        const response:any = await api.put('/produto/atualizar', body);

        if (response?.data?.result === 'success') {
            return {
                success: true,
                message: 'Produto atualizado com sucesso.'
            }
        }else{
            console.error(response?.data?.message); 
            throw new Error(response?.data?.message ?? 'Erro ao tentar atualizar Produto');
        }

    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar atualizar Produto'
        }
    }
}

export const getListProduto = async () => {
    try {
        const response:any = await api.get('/produto/buscar');

        if(response?.data?.result === 'success'){

            if(!response?.data?.data.length) return [];

            const list = response.data.data.map((element:any) => {
                return {
                    label: `${element.id_produto} - ${element.tx_nome}`,
                    value: `${element.id_produto}`
                }
            });

            return list;
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar buscar os Produtos')
        }
    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar buscar os Produtos'
        }
    }
}
import api from "../../services/api";

import { maskDinheiro, maskData, unmaskValor, unmaskData } from "../../utils/Mask";

//Compra

const arrayFormatt = (arr:any) => {
    if(!arr || !arr.length) return {};
    const formattedArray = arr.map((item:any) => {
        return {
            "Código": item.id_compra,
            "Fornecedor": item.fornecedor,
            "Data Compra": maskData(item.dt_compra),
            "Valor Compra": maskDinheiro(item.vr_total_compra)
        }
    })

    return formattedArray;
}

export const getAllCompra = async (setCompras:any) => {
    try {
        const response:any = await api.get('/compra/buscar');

        if(response?.data?.result === 'success'){
            setCompras(arrayFormatt(response.data?.data));
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar buscar os Compras')
        }
    }catch(error:any){
        console.log(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar buscar os Compras'
        }
    }
}

export const createCompra = async (compraData: any) => {
    try {

        const body = {
            id_fornecedor: Number(compraData.id_fornecedor),
            dt_compra: unmaskData(compraData.dt_compra)
        }

        const response:any = await api.post('/compra/criar', body);

        if (response?.data?.result === 'success') {
            return {
                success: true,
                message: 'Compra cadastrada com sucesso.',
                id: response.data.data.id_compra
            }
        }else{
            console.error(response?.data?.message); 
            throw new Error(response?.data?.message ?? 'Erro ao tentar criar Compra');
        }

    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar criar Compra'
        }
    }
}

export const getCompra = async (id_compra: string) => {
    try {
        const response:any = await api.get(`/compra/buscar?id_compra=${id_compra}`);
        if(response?.data?.result === 'success' && response?.data?.data[0]){

            let dt_formatada = response?.data?.data[0].dt_compra;

            if(dt_formatada){
                dt_formatada = response?.data?.data[0].dt_compra.replaceAll('-', '');
                dt_formatada = `${dt_formatada.slice(6,8)}/${dt_formatada.slice(4,6)}/${dt_formatada.slice(0,4)}`;
            }

            const res = {...response?.data?.data[0], dt_compra: dt_formatada}

            return res;
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar buscar a Compra')
        }
    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar buscar a Compra'
        }
    }
}

export const deleteCompra = async (id_compra: string) => {
    try {
        const response:any = await api.delete(`/compra/deletar?id_compra=${id_compra}`);
        if(response?.data?.result === 'success'){
            return {
                success: true,
                message: response?.data?.message??'Compra deletada com sucesso.'
            };
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar deletar a Compra')
        }
    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar deletar a Compra'
        }
    }
}

export const putCompra = async (compraData: any) => {
    try {

        const body = {
            id_compra: Number(compraData.id_compra), 
            id_fornecedor: Number(compraData.id_fornecedor),
            dt_compra: unmaskData(compraData.dt_compra)
        }

        console.log(body);

        const response:any = await api.put('/compra/atualizar', body);

        if (response?.data?.result === 'success') {
            return {
                success: true,
                message: 'Compra atualizada com sucesso.'
            }
        }else{
            console.error(response?.data?.message); 
            throw new Error(response?.data?.message ?? 'Erro ao tentar atualizar Compra');
        }

    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar atualizar Compra'
        }
    }
}

//Itens da compra

const arrayFormattItem = (arr:any) => {
    if(!arr || !arr.length) return {};
    const formattedArray = arr.map((item:any) => {
        return {
            "Código": item.id_compra_produto,
            "Produto": item.estoque,
            "Quantidade": item.nu_quantidade,
            "Valor Total": maskDinheiro(item.vr_total)
        }
    })

    return formattedArray;
}

export const getAllItemCompra = async (setCompraItens:any) => {
    try {
        const response:any = await api.get('/compraProduto/buscar');

        if(response?.data?.result === 'success'){
            setCompraItens(arrayFormatt(response.data?.data));
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar buscar os Itens das Compras')
        }
    }catch(error:any){
        console.log(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar buscar os Itens das Compras'
        }
    }
}

export const createItemCompra = async (compraData: any) => {
    try {

        const body = {
            id_compra: Number(compraData.id_compra),
            id_estoque: Number(compraData.id_estoque),
            id_produto: Number(compraData.id_produto),
            nu_quantidade: Number(compraData.nu_quantidade),
            vr_total: maskDinheiro(compraData.vr_total)
        }

        const response:any = await api.post('/compraProduto/criar', body);

        if (response?.data?.result === 'success') {
            return {
                success: true,
                message: 'Item daCompra cadastrado com sucesso.',
                id: response.data.data.id_compra_produto
            }
        }else{
            console.error(response?.data?.message); 
            throw new Error(response?.data?.message ?? 'Erro ao tentar criar Item da Compra');
        }

    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar criar Item da Compra'
        }
    }
}

export const getItemCompra = async (id_compra: string, id_compra_produto: string) => {
    try {
        const response:any = await api.get(`/compraProduto/buscar?id_compra=${id_compra}&id_compra_produto=${id_compra_produto}`);
        if(response?.data?.result === 'success' && response?.data?.data[0]){

            return response;
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar buscar o Item da Compra')
        }
    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar buscar Item da Compra'
        }
    }
}

export const deleteItemCompra = async (id_compra: string, id_compra_produto:string) => {
    try {
        const response:any = await api.delete(`/compra/deletar?id_compra=${id_compra}&id_compra_produto=${id_compra_produto}`);
        if(response?.data?.result === 'success'){
            return {
                success: true,
                message: response?.data?.message??'Item da Compra deletado com sucesso.'
            };
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar deletar o Item da Compra')
        }
    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar deletar o Item da Compra'
        }
    }
}

export const putItemCompra = async (compraData: any) => {
    try {

        const body = {
            id_compra: Number(compraData.id_compra),
            id_compra_produto: Number(compraData.id_compra_produto),
            id_estoque: Number(compraData.id_estoque),
            id_produto: Number(compraData.id_produto),
            nu_quantidade: Number(compraData.nu_quantidade),
            vr_total: maskDinheiro(compraData.vr_total)
        }

        console.log(body);

        const response:any = await api.put('/compra/atualizar', body);

        if (response?.data?.result === 'success') {
            return {
                success: true,
                message: 'Item da Compra atualizado com sucesso.'
            }
        }else{
            console.error(response?.data?.message); 
            throw new Error(response?.data?.message ?? 'Erro ao tentar atualizar Item da Compra');
        }

    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar atualizar Item da Compra'
        }
    }
}

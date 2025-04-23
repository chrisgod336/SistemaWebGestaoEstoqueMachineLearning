import api from "../../services/api";

import { maskDinheiro, maskData, unmaskValor, unmaskData } from "../../utils/Mask";

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


import api from "../../services/api";
import { maskDinheiro, maskData, unmaskValor, unmaskData } from "../../utils/Mask";

const arrayFormatt = (arr:any) => {
    if(!arr || !arr.length) return {};
    const formattedArray = arr.map((item:any) => {

        let dt_formatada = item.dt_venda;

        if(dt_formatada){
            dt_formatada = item.dt_venda.replaceAll('-', '');
            dt_formatada = `${dt_formatada.slice(6,8)}/${dt_formatada.slice(4,6)}/${dt_formatada.slice(0,4)}`;
        }

        return {
            "Código": item.id_venda,
            "Cliente": item.cliente,
            "Data Venda": dt_formatada,
            "Valor Total": maskDinheiro(item.vr_venda)
        }
    })

    return formattedArray;
}

export const getAllVenda = async (setVendas:any) => {
    try {
        const response:any = await api.get('/venda/buscar');

        if(response?.data?.result === 'success'){
            setVendas(arrayFormatt(response.data?.data));
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar buscar os Vendas')
        }
    }catch(error:any){
        console.log(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar buscar os Vendas'
        }
    }
}

export const createVenda = async (vendaData: any) => {
    try {

        const body = {
            id_cliente: Number(vendaData.id_cliente),
            dt_venda: unmaskData(vendaData.dt_venda),
            status: 'BAIXADA'
        }

        const response:any = await api.post('/venda/criar', body);

        if (response?.data?.result === 'success') {
            return {
                success: true,
                message: 'Venda cadastrada com sucesso.',
                id: response.data.data.id_venda
            }
        }else{
            console.error(response?.data?.message); 
            throw new Error(response?.data?.message ?? 'Erro ao tentar criar Venda');
        }

    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar criar Venda'
        }
    }
}

export const getVenda = async (id_venda: string) => {
    try {
        const response:any = await api.get(`/venda/buscar?id_venda=${id_venda}`);
        if(response?.data?.result === 'success' && response?.data?.data[0]){

            let dt_formatada = response?.data?.data[0].dt_venda;

            if(dt_formatada){
                dt_formatada = response?.data?.data[0].dt_venda.replaceAll('-', '');
                dt_formatada = `${dt_formatada.slice(6,8)}/${dt_formatada.slice(4,6)}/${dt_formatada.slice(0,4)}`;
            }

            const res = {...response?.data?.data[0], dt_venda: dt_formatada}

            return res;
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar buscar a Venda')
        }
    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar buscar a Venda'
        }
    }
}

export const deleteVenda = async (id_venda: string) => {
    try {
        const response:any = await api.delete(`/venda/deletar?id_venda=${id_venda}`);
        if(response?.data?.result === 'success'){
            return {
                success: true,
                message: response?.data?.message??'Venda deletada com sucesso.'
            };
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar deletar a Venda')
        }
    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar deletar a Venda'
        }
    }
}

export const putVenda = async (vendaData: any) => {
    try {

        const body = {
            id_venda: Number(vendaData.id_venda), 
            id_cliente: Number(vendaData.id_cliente),
            dt_venda: unmaskData(vendaData.dt_venda)
        }

        console.log(body);

        const response:any = await api.put('/venda/atualizar', body);

        if (response?.data?.result === 'success') {
            return {
                success: true,
                message: 'Venda atualizada com sucesso.'
            }
        }else{
            console.error(response?.data?.message); 
            throw new Error(response?.data?.message ?? 'Erro ao tentar atualizar Venda');
        }

    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar atualizar Venda'
        }
    }
}

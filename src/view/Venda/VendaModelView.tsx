import api from "../../services/api";

import { maskDinheiro, maskData } from "../../utils/Mask";

const arrayFormatt = (arr:any) => {
    const formattedArray = arr.map((item:any) => {
        return {
            "Código": item.id_venda,
            "Código Cliente": item.id_cliente,
            "Status": item.status,
            "Data Venda": maskData(item.dt_venda),
            "Valor Total": maskDinheiro(item.vr_venda)
        }
    })

    return formattedArray;
}

const getAllVenda = async (setVendas:any) => {
    try {
        const response:any = await api.get('/venda/buscar');

        if(response?.data?.result === 'success' && response?.data?.data){
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

export {getAllVenda}
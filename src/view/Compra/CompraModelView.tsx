import api from "../../services/api";

import { maskDinheiro, maskData } from "../../utils/Mask";

const arrayFormatt = (arr:any) => {
    if(!arr || !arr.length) return {};
    const formattedArray = arr.map((item:any) => {
        return {
            "Código": item.id_compra,
            "Código Fornecedor": item.id_fornecedor,
            "Data Compra": maskData(item.dt_compra),
            "Valor Compra": maskDinheiro(item.vr_compra),
            "Valor Frete": maskDinheiro(item.vr_frete),
            "Valor Total": maskDinheiro(item.vr_total_compra),
            "Status": item.tx_status,
            "Data de entrega": maskData(item.dt_entrega??false)
        }
    })

    return formattedArray;
}

const getAllCompra = async (setCompras:any) => {
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

export {getAllCompra}
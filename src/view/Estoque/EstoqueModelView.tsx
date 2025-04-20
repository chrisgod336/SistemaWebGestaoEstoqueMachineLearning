import api from "../../services/api";

const arrayFormatt = (arr:any) => {
    const formattedArray = arr.map((item:any) => {
        return {
            "Código": item.id_estoque,
            "Código Produto": item.id_produto,
            "Quantidade": item.nu_quantidade
        }
    })

    return formattedArray;
}

const getAllEstoque = async (setEstoques:any) => {
    try {
        const response:any = await api.get('/estoque/buscar?id_local_estoque=1');

        if(response?.data?.result === 'success' && response?.data?.data){
            setEstoques(arrayFormatt(response.data?.data));
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar buscar os Estoques')
        }
    }catch(error:any){
        console.log(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar buscar os Estoques'
        }
    }
}

export {getAllEstoque}
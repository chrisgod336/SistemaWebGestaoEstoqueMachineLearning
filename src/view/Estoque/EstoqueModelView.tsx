import api from "../../services/api";

const arrayFormatt = (arr:any) => {
    if(!arr || !arr.length) return {};
    const formattedArray = arr.map((item:any) => {
        return {
            "Código": item.id_estoque,
            "Produto": item.produto,
            "Quantidade": item.nu_quantidade
        }
    })

    return formattedArray;
}

export const getAllEstoque = async (setEstoques:any) => {
    try {
        const response:any = await api.get('/estoque/buscar');

        if(response?.data?.result === 'success'){
            setEstoques(arrayFormatt(response.data?.data));
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar buscar os Estoques')
        }
    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar buscar os Estoques'
        }
    }
}

export const createEstoque = async (estoqueData: any) => {
    try {

        const validate:any = await api.get(`/estoque/countProduto?id_produto=${estoqueData.id_produto}`);

        if(validate.data.data[0].count >= 1){
            return {
                success: false,
                message: 'Já existe um Estoque desse produto Cadastrado.'
            }
        }

        const body = {
            id_produto: estoqueData.id_produto,
            nu_quantidade: estoqueData.nu_quantidade
        }

        const response:any = await api.post('/estoque/criar', body);

        if (response?.data?.result === 'success') {
            return {
                success: true,
                message: 'Estoque cadastrado com sucesso.',
                id: response.data.data.id_estoque
            }
        }else{
            console.error(response?.data?.message); 
            throw new Error(response?.data?.message ?? 'Erro ao tentar criar Estoque');
        }

    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar criar Estoque'
        }
    }
}

export const getEstoque = async (id_estoque: string) => {
    try {
        const response:any = await api.get(`/estoque/buscar?id_estoque=${id_estoque}`);
        if(response?.data?.result === 'success' && response?.data?.data[0]){
            return response?.data?.data[0];
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar buscar o Estoque')
        }
    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar buscar o Estoque'
        }
    }
}

export const deleteEstoque = async (id_estoque: string) => {
    try {
        const response:any = await api.delete(`/estoque/deletar?id_estoque=${id_estoque}`);
        if(response?.data?.result === 'success'){
            return {
                success: true,
                message: response?.data?.message??'Estoque deletado com sucesso.'
            };
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar deletar o Estoque')
        }
    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar deletar o Estoque'
        }
    }
}

export const putEstoque = async (estoqueData: any) => {
    try {

        const validate:any = await api.get(`/estoque/countProduto?id_produto=${estoqueData.id_produto}`);

        if(validate.data.data[0].count >= 1){

            const thisEstoque = await api.get(`/estoque/buscar?id_estoque=${estoqueData.id_estoque}`);

            if(thisEstoque.data.data[0].id_produto != estoqueData.id_produto){
                return {
                    success: false,
                    message: 'Já existe um Estoque desse produto Cadastrado.'
                }
            }
        }

        const body = {
            id_estoque: Number(estoqueData.id_estoque), 
            id_produto: Number(estoqueData.id_produto),
            nu_quantidade: Number(estoqueData.nu_quantidade),
        }

        const response:any = await api.put('/estoque/atualizar', body);

        if (response?.data?.result === 'success') {
            return {
                success: true,
                message: 'Estoque atualizado com sucesso.'
            }
        }else{
            console.error(response?.data?.message); 
            throw new Error(response?.data?.message ?? 'Erro ao tentar atualizar Estoque');
        }

    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar atualizar Estoque'
        }
    }
}

export const getListEstoque = async () => {
    try {
        const response:any = await api.get('/estoque/buscar');

        if(response?.data?.result === 'success'){

            if(!response?.data?.data.length) return [];

            const list = response.data.data.map((element:any) => {
                return {
                    label: `${element.id_produto} - ${element.produto}`,
                    value: `${element.id_estoque}`
                }
            });

            return list;
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar buscar os Estoques')
        }
    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar buscar os Estoques'
        }
    }
}

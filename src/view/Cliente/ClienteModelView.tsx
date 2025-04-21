import api from "../../services/api";
import { maskCpfCnpj, maskTelefone, maskDinheiro, unmaskCpfCnpj, unmaskTelefone, unmaskValor } from "../../utils/Mask";

const arrayFormatt = (arr:any) => {
    if(!arr || !arr.length) return {};
    const formattedArray = arr.map((item:any) => {
        return {
            "Código": item.id_cliente,
            "Nome": item.tx_nome,
            "CPF/CNPJ": maskCpfCnpj(item.tx_cpf_cnpj),
            "E-mail": item.tx_email,
            "Telefone": maskTelefone(item.tx_telefone)
        }
    })

    return formattedArray;
}

export const getAllCliente = async (setClientes:any) => {
    try {
        const response:any = await api.get('/cliente/buscar');

        if(response?.data?.result === 'success'){
            setClientes(arrayFormatt(response.data?.data));
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar buscar os clientes')
        }
    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar buscar os clientes'
        }
    }
}

export const createCliente = async (clienteData: any) => {
    try {

        const body = {
            tx_nome: clienteData.tx_nome,
            tx_cpf_cnpj: unmaskCpfCnpj(clienteData.tx_cpf_cnpj),
            tx_email: clienteData.tx_email??'',
            tx_telefone: unmaskTelefone(clienteData.tx_telefone??'')
        }

        console.log("BODY: ", body);

        const response:any = await api.post('/cliente/criar', body);
        console.log("RES DATA: ", response.data);

        if (response?.data?.result === 'success') {
            return {
                success: true,
                message: 'Cliente cadastrado com sucesso.',
                id: response.data.data.id_cliente
            }
        }else{
            console.error(response?.data?.message); 
            throw new Error(response?.data?.message ?? 'Erro ao tentar criar Cliente');
        }

    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar criar Cliente'
        }
    }
}

export const getCliente = async (id_cliente: string) => {
    try {
        const response:any = await api.get(`/cliente/buscar?id_cliente=${id_cliente}`);
        if(response?.data?.result === 'success' && response?.data?.data[0]){
            return response?.data?.data[0];
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar buscar o Cliente')
        }
    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar buscar os Cliente'
        }
    }
}

export const deleteCliente = async (id_cliente: string) => {
    try {
        const response:any = await api.delete(`/cliente/deletar?id_cliente=${id_cliente}`);
        if(response?.data?.result === 'success'){
            return {
                success: true,
                message: response?.data?.message??'Cliente deletado com sucesso.'
            };
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar deletar o Cliente')
        }
    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar deletar o Cliente'
        }
    }
}

export const putCliente = async (clienteData: any) => {
    try {

        const body = {
            id_cliente: Number(clienteData.id_cliente), 
            tx_nome: clienteData.tx_nome,
            tx_cpf_cnpj: unmaskCpfCnpj(clienteData.tx_cpf_cnpj),
            tx_email: clienteData.tx_email??'',
            tx_telefone: unmaskTelefone(clienteData.tx_telefone??'')
        }

        const response:any = await api.put('/cliente/atualizar', body);

        if (response?.data?.result === 'success') {
            return {
                success: true,
                message: 'Cliente atualizado com sucesso.'
            }
        }else{
            console.error(response?.data?.message); 
            throw new Error(response?.data?.message ?? 'Erro ao tentar atualizar Cliente');
        }

    }catch(error:any){
        console.error(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar atualizar Cliente'
        }
    }
}
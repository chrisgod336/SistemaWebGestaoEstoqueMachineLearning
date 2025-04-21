import api from "../../services/api";
import { maskCpfCnpj, maskTelefone, maskDinheiro, unmaskCpfCnpj, unmaskTelefone, unmaskValor } from "../../utils/Mask";

const arrayFormatt = (arr:any) => {
    const formattedArray = arr.map((item:any) => {
        return {
            "Código": item.id_fornecedor,
            "Razão Social": item.tx_razao_social,
            "CPF/CNPJ": maskCpfCnpj(item.tx_cpf_cnpj),
            "E-mail": item.tx_email,
            "Telefone": maskTelefone(item.tx_telefone),
            "Valor Frete": maskDinheiro(item.vr_frete)
        }
    })

    return formattedArray;
}

export const getAllFornecedor = async (setFornecedores:any) => {
    try {
        const response:any = await api.get('/fornecedor/buscar');

        if(response?.data?.result === 'success' && response?.data?.data[0]){
            setFornecedores(arrayFormatt(response.data?.data));
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar buscar os Fornecedores')
        }
    }catch(error:any){
        console.log(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar buscar os Fornecedores'
        }
    }
}

export const createFornecedor = async (fornecedorData: any) => {
    try {

        const body = {
            tx_razao_social: fornecedorData.tx_razao_social,
            tx_cpf_cnpj: unmaskCpfCnpj(fornecedorData.tx_cpf_cnpj),
            tx_email: fornecedorData.tx_email??'',
            tx_telefone: unmaskTelefone(fornecedorData.tx_telefone??''),
            vr_frete: unmaskValor(fornecedorData.vr_frete),
            nu_dias_previsao_inicial_entrega: 0,
            nu_dias_previsao_final_entrega: 0,
            tx_pais: '',
            tx_uf: '',
            tx_cidade: '',
            tx_endereco: ''
        }

        const response:any = await api.post('/fornecedor/criar', body);
        console.log(response.data);

        if (response?.data?.result === 'success') {
            return {
                success: true,
                message: 'Fornecedor cadastrado com sucesso.',
                id: response.data.data.id_fornecedor
            }
        }else{
            console.error(response?.data?.message); 
            throw new Error(response?.data?.message ?? 'Erro ao tentar criar Fornecedor');
        }

    }catch(error:any){
        console.log(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar criar Fornecedor'
        }
    }
}

export const getFornecedor = async (id_fornecedor: string) => {
    try {
        const response:any = await api.get(`/fornecedor/buscar?id_fornecedor=${id_fornecedor}`);
        if(response?.data?.result === 'success' && response?.data?.data[0]){
            return response?.data?.data[0];
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar buscar os Fornecedor')
        }
    }catch(error:any){
        console.log(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar buscar os Fornecedor'
        }
    }
}

export const deleteFornecedor = async (id_fornecedor: string) => {
    try {
        const response:any = await api.delete(`/fornecedor/deletar?id_fornecedor=${id_fornecedor}`);
        if(response?.data?.result === 'success'){
            return {
                success: true,
                message: response?.data?.message??'Fornecedor deletado com sucesso.'
            };
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar deletar o Fornecedor')
        }
    }catch(error:any){
        console.log(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar deletar o Fornecedor'
        }
    }
}

export const putFornecedor = async (fornecedorData: any) => {
    try {

        const body = {
            id_fornecedor: Number(fornecedorData.id_fornecedor), 
            tx_razao_social: fornecedorData.tx_razao_social,
            tx_cpf_cnpj: unmaskCpfCnpj(fornecedorData.tx_cpf_cnpj),
            tx_email: fornecedorData.tx_email??'',
            tx_telefone: unmaskTelefone(fornecedorData.tx_telefone??''),
            vr_frete: Number(unmaskValor(fornecedorData.vr_frete)),
            nu_dias_previsao_inicial_entrega: 0,
            nu_dias_previsao_final_entrega: 0,
            tx_pais: "",
            tx_uf: "",
            tx_cidade: "",
            tx_endereco: ""
        }

        console.log("BODY: ", body);

        const response:any = await api.put('/fornecedor/atualizar', body);
        console.log(response.data);

        if (response?.data?.result === 'success') {
            return {
                success: true,
                message: 'Fornecedor atualizado com sucesso.'
            }
        }else{
            console.error(response?.data?.message); 
            throw new Error(response?.data?.message ?? 'Erro ao tentar atualizar Fornecedor');
        }

    }catch(error:any){
        console.log(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar atualizar Fornecedor'
        }
    }
}
import api from "../../services/api";
import { maskCpfCnpj, maskTelefone } from "../../utils/Mask";

const arrayFormatt = (arr:any) => {
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

const getAllCliente = async (setClientes:any) => {
    try {
        const response:any = await api.get('/cliente/buscar');

        if(response?.data?.result === 'success' && response?.data?.data){
            setClientes(arrayFormatt(response.data?.data));
        }else{
            console.error(response?.data?.message)
            throw new Error(response?.data?.message??'Erro ao tentar buscar os clientes')
        }
    }catch(error:any){
        console.log(error);
        return {
            success: false,
            message: error?.message??'Erro ao tentar buscar os clientes'
        }
    }
}

export {getAllCliente}
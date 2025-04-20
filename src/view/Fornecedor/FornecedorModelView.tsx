import api from "../../services/api";
import { maskCpfCnpj, maskTelefone, maskDinheiro } from "../../utils/Mask";

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

const getAllFornecedor = async (setFornecedores:any) => {
    try {
        const response:any = await api.get('/fornecedor/buscar');

        if(response?.data?.result === 'success' && response?.data?.data){
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

export {getAllFornecedor}
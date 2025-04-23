import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Screen from "../../components/Screen";
import BootstrapForm from "../../components/Form";
import { maskCpfCnpj, maskTelefone, maskDinheiro } from "../../utils/Mask";
import { createFornecedor, getFornecedor, deleteFornecedor, putFornecedor } from "./FornecedorModelView";

interface FieldConfig {
    label: string;
    type: 'text' | 'select' | 'email' | 'cpf_cnpj'; 
    value: any;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    options?: { label: string; value: any }[];
    mask?: (value: any) => string;
    readonly?: boolean;
  }

const FornecedorFormularioView = () => {

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [fornecedor, setFornecedor] = useState<Record<string, FieldConfig>>({
        id_fornecedor: {
            label: 'Código',
            type: 'text',
            value: id??'0',
            readonly: true
        },
        tx_razao_social: {
            label: 'Razão Social (obrigatório)',
            type: 'text',
            value: '',
            required: true,
            minLength: 3,
            maxLength: 100
        },
        tx_cpf_cnpj: {
            label: 'CPF/CNPJ (obrigatório)',
            type: 'cpf_cnpj',
            value: '',
            required: true,
            minLength: 14,
            maxLength: 18,
            mask: maskCpfCnpj
        },
        tx_email: {
            label: 'Email', 
            type: 'email', 
            value: '', 
            required: false,
            minLength: 3,
            maxLength: 100
        },
        tx_telefone: {
            label: 'Telefone',
            type: 'text',
            value: '',
            required: false,
            minLength: 15,
            maxLength: 15,
            mask: maskTelefone
        }
    })

    useEffect(() => {
        async function fetchFornecedor() {
            if (id) {
                const data = await getFornecedor(id.toString());
    
                const newFornecedor = { ...fornecedor };
    
                for (const key in newFornecedor) {
                    if (Object.prototype.hasOwnProperty.call(newFornecedor, key)) {
                      const field = newFornecedor[key] as FieldConfig;
                  
                      const rawValue = data?.[key];
                  
                      newFornecedor[key] = {
                        ...field,
                        value: field.mask ? field.mask(rawValue) : rawValue ?? field.value
                      };
                    }
                  }
                  
                setFornecedor(newFornecedor);
            }
        }
    
        fetchFornecedor();
    }, []);
    
    return (
        <Screen title={fornecedor?.id_fornecedor?.value !== '0' ? 'Editar Fornecedor' : 'Cadastrar Fornecedor'} backApplication="/fornecedores">
            <BootstrapForm 
            isNew={fornecedor?.id_fornecedor?.value === '0'?true:false}
            fields={fornecedor}
            onNew={() => {navigate('/fornecedores/novo');window.location.reload()}}
            onCreate={async (value) => {
                const response = await createFornecedor(value);
                if(response.success){

                    const newId = response.id;

                    Swal.fire({
                        title: "Sucesso!",
                        text: response.message,
                        icon: "success",
                        draggable: true
                      }).then(() => {
                        navigate(`/fornecedores/${newId}`)
                        window.location.reload()
                      })
                }else{
                    Swal.fire({
                        title: "Erro!",
                        text: response.message,
                        icon: "error",
                        draggable: true
                      })
                }
            }}
            onSave={async (value) => {
                const response = await putFornecedor(value);
                if(response.success){

                    Swal.fire({
                        title: "Sucesso!",
                        text: response.message,
                        icon: "success",
                        draggable: true
                      })
                }else{
                    Swal.fire({
                        title: "Erro!",
                        text: response.message,
                        icon: "error",
                        draggable: true
                      })
                }
            }}
            onDelete={() => {
                Swal.fire({
                    title: "Aviso!",
                    text: 'Tem certeza que deseja excluir o Fornecedor?',
                    icon: "info",
                    draggable: true,
                    showCancelButton: true
                  }).then(async (value) => {
                    if(!value.isConfirmed){
                        return;
                    }

                    const response = await deleteFornecedor(fornecedor.id_fornecedor.value);

                    if(response.success){
                        Swal.fire({
                            title: "Sucesso!",
                            text: response.message,
                            icon: "success",
                            draggable: true
                          }).then(() => {
                            navigate('/fornecedores');
                          })
                    }else{
                        Swal.fire({
                            title: "Erro!",
                            text: 'Erro ao tentar excluir fornecedor.',
                            icon: "error",
                            draggable: true
                          })
                    }
                })
            }}
            />
        </Screen>
    );
}

export default FornecedorFormularioView;
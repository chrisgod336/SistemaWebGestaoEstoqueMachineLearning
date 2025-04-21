import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Screen from "../../components/Screen";
import BootstrapForm from "../../components/Form";
import { maskCpfCnpj, maskTelefone, maskDinheiro } from "../../utils/Mask";
import { createCliente, getCliente, deleteCliente, putCliente } from "./ClienteModelView";

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

const ClienteFormularioView = () => {

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [cliente, setCliente] = useState<Record<string, FieldConfig>>({
        id_cliente: {
            label: 'Código',
            type: 'text',
            value: id??'0',
            readonly: true
        },
        tx_nome: {
            label: 'Nome (obrigatório)',
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
        async function fetchCliente() {
            if (id) {
                const data = await getCliente(id.toString());
    
                const newCliente = { ...cliente };
    
                for (const key in newCliente) {
                    if (Object.prototype.hasOwnProperty.call(newCliente, key)) {
                        const field = newCliente[key] as FieldConfig;
                    
                        const rawValue = data?.[key];
                    
                        newCliente[key] = {
                        ...field,
                        value: field.mask ? field.mask(rawValue) : rawValue ?? field.value
                        };
                    }
                    }
                    
                setCliente(newCliente);
            }
        }
    
        fetchCliente();
    }, []);
    

    return(
    <Screen title={cliente?.id_cliente?.value !== '0' ? 'Editar Cliente' : 'Cadastrar Cliente'} backApplication="/clientes">
        <BootstrapForm 
            isNew={cliente?.id_cliente?.value === '0'?true:false}
            fields={cliente}
            onNew={() => {navigate('/clientes/novo');window.location.reload()}}
            onCreate={async (value) => {
                const response = await createCliente(value);
                if(response.success){

                    const newId = response.id;

                    Swal.fire({
                        title: "Sucesso!",
                        text: response.message,
                        icon: "success",
                        draggable: true
                      }).then(() => {
                        navigate(`/clientes/${newId}`)
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
                const response = await putCliente(value);
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
                    text: 'Tem certeza que deseja excluir o Cliente?',
                    icon: "info",
                    draggable: true,
                    showCancelButton: true
                  }).then(async (value) => {
                    if(!value.isConfirmed){
                        return;
                    }

                    const response = await deleteCliente(cliente.id_cliente.value);

                    if(response.success){
                        Swal.fire({
                            title: "Sucesso!",
                            text: response.message,
                            icon: "success",
                            draggable: true
                          }).then(() => {
                            navigate('/clientes');
                          })
                    }else{
                        Swal.fire({
                            title: "Erro!",
                            text: 'Erro ao tentar excluir cliente.',
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

export default ClienteFormularioView;
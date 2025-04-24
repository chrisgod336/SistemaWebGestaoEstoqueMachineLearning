import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Screen from "../../components/Screen";
import BootstrapForm from "../../components/Form";
import { createVenda, getVenda, deleteVenda, putVenda } from "./VendaModelView";
import { getListCliente } from "../Cliente/ClienteModelView";
import { maskData, maskDinheiro, unmaskData, unmaskValor } from "../../utils/Mask";

interface FieldConfig {
    label: string;
    type: 'text' | 'select' | 'email' | 'cpf_cnpj' | 'number'; 
    value: any;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    options?: { label: string; value: any }[];
    mask?: (value: any) => string;
    readonly?: boolean;
  }

const VendaFormularioView = () => {

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`;

    const [venda, setVenda] = useState<Record<string, FieldConfig>>({
        id_venda: {
            label: 'Código',
            type: 'text',
            value: id??'0',
            readonly: true
        },
        id_cliente: {
            label: 'Cliente (obrigatório)',
            type: 'select',
            value: '',
            options: [],
            required: true
        },
        dt_venda: {
            label: 'Data da Venda (obrigatório)',
            type: 'text',
            value: dataFormatada,
            required: true,
            mask: maskData,
            minLength: 10
        },
        vr_venda: {
            label: 'Valor da Venda',
            type: 'text',
            value: maskDinheiro('0'),
            readonly: true,
            mask: maskDinheiro
        }
    })

    useEffect(() => {
        async function fetchVenda() {

            const clientes:any = await getListCliente();

            if(!clientes || !clientes.length){
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: "Nenhum Cliente encontrado. Por favor cadastre um Cliente para poder cadastrar uma venda.",
                }).then((value) => {if(value.isConfirmed) navigate('/clientes')})
            }

            if (id) {
                const data = await getVenda(id.toString());
    
                const newVenda = { ...venda };
    
                for (const key in newVenda) {
                    if (Object.prototype.hasOwnProperty.call(newVenda, key)) {
                        const field = newVenda[key] as FieldConfig;
                    
                        const rawValue = data?.[key];
                    
                        newVenda[key] = {
                        ...field,
                        value: field.mask ? field.mask(rawValue) : rawValue ?? field.value,
                        options: key === 'id_cliente' ? clientes : (field.options||[])
                        };
                    }
                    }
                    
                setVenda(newVenda);
            }else{
                const newVenda = { ...venda , id_cliente: {
                    ...venda.id_cliente,
                    options: clientes
                }};

                setVenda(newVenda);
            }
        }
    
        fetchVenda();
    }, []);

    return (
        <Screen title={venda?.id_venda?.value !== '0' ? "Editar Venda" : "Cadastrar Venda"} backApplication="/vendas">
            <BootstrapForm 
                isNew={venda?.id_venda?.value === '0'?true:false}
                fields={venda}
                onNew={() => {navigate('/vendas/novo');window.location.reload()}}
                iframe={'/venda-itens'}
                onCreate={async (value) => {
                const response = await createVenda(value);
                if(response.success){

                    const newId = response.id;

                    Swal.fire({
                        title: "Sucesso!",
                        text: response.message,
                        icon: "success",
                        draggable: true
                      }).then(() => {
                        navigate(`/vendas/${newId}`)
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
                const response = await putVenda(value);
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
                    text: 'Tem certeza que deseja excluir a Venda?',
                    icon: "info",
                    draggable: true,
                    showCancelButton: true
                  }).then(async (value) => {
                    if(!value.isConfirmed){
                        return;
                    }

                    const response = await deleteVenda(venda.id_venda.value);

                    if(response.success){
                        Swal.fire({
                            title: "Sucesso!",
                            text: response.message,
                            icon: "success",
                            draggable: true
                          }).then(() => {
                            navigate('/vendas');
                          })
                    }else{
                        Swal.fire({
                            title: "Erro!",
                            text: 'Erro ao tentar excluir Venda.',
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

export default VendaFormularioView;
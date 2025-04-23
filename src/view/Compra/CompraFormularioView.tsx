import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Screen from "../../components/Screen";
import BootstrapForm from "../../components/Form";
import { createCompra, getCompra, deleteCompra, putCompra } from "./CompraModelView";
import { getListFornecedor } from "../Fornecedor/FornecedorModelView";
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


const CompraFormularioView = () => {

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`;

    const [compra, setCompra] = useState<Record<string, FieldConfig>>({
        id_compra: {
            label: 'Código',
            type: 'text',
            value: id??'0',
            readonly: true
        },
        id_fornecedor: {
            label: 'Fornecedor (obrigatório)',
            type: 'select',
            value: '',
            options: [],
            required: true
        },
        dt_compra: {
            label: 'Data da Compra (obrigatório)',
            type: 'text',
            value: dataFormatada,
            required: true,
            mask: maskData,
            minLength: 10
        },
        vr_compra: {
            label: 'Valor da Compra',
            type: 'text',
            value: maskDinheiro('0'),
            readonly: true,
            mask: maskDinheiro
        }
    })

    useEffect(() => {
        async function fetchCompra() {

            const fornecedores:any = await getListFornecedor();

            if(!fornecedores || !fornecedores.length){
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: "Nenhum Fornecedor encontrado. Por favor cadastre um Fornecedor para poder cadastrar uma compra.",
                }).then((value) => {if(value.isConfirmed) navigate('/fornecedores')})
            }

            if (id) {
                const data = await getCompra(id.toString());
    
                const newCompra = { ...compra };
    
                for (const key in newCompra) {
                    if (Object.prototype.hasOwnProperty.call(newCompra, key)) {
                        const field = newCompra[key] as FieldConfig;
                    
                        const rawValue = data?.[key];
                    
                        newCompra[key] = {
                        ...field,
                        value: field.mask ? field.mask(rawValue) : rawValue ?? field.value,
                        options: key === 'id_fornecedor' ? fornecedores : (field.options||[])
                        };
                    }
                    }
                    
                setCompra(newCompra);
            }else{
                const newCompra = { ...compra , id_fornecedor: {
                    ...compra.id_fornecedor,
                    options: fornecedores
                }};

                setCompra(newCompra);
            }
        }
    
        fetchCompra();
    }, []);

    return (
        <Screen title={compra?.id_compra?.value !== '0' ? "Editar Compra" : "Cadastrar Compra"} backApplication="/compras">
            <BootstrapForm 
                isNew={compra?.id_compra?.value === '0'?true:false}
                fields={compra}
                onNew={() => {navigate('/compras/novo');window.location.reload()}}
                onCreate={async (value) => {
                const response = await createCompra(value);
                if(response.success){

                    const newId = response.id;

                    Swal.fire({
                        title: "Sucesso!",
                        text: response.message,
                        icon: "success",
                        draggable: true
                      }).then(() => {
                        navigate(`/compras/${newId}`)
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
                const response = await putCompra(value);
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
                    text: 'Tem certeza que deseja excluir a Compra?',
                    icon: "info",
                    draggable: true,
                    showCancelButton: true
                  }).then(async (value) => {
                    if(!value.isConfirmed){
                        return;
                    }

                    const response = await deleteCompra(compra.id_compra.value);

                    if(response.success){
                        Swal.fire({
                            title: "Sucesso!",
                            text: response.message,
                            icon: "success",
                            draggable: true
                          }).then(() => {
                            navigate('/compras');
                          })
                    }else{
                        Swal.fire({
                            title: "Erro!",
                            text: 'Erro ao tentar excluir Compra.',
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

export default CompraFormularioView;
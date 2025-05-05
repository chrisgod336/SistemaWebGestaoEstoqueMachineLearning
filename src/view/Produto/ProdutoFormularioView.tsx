import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Screen from "../../components/Screen";
import BootstrapForm from "../../components/Form";
import { maskDinheiro } from "../../utils/Mask";
import { createProduto, getProduto, deleteProduto, putProduto } from "./ProdutoModelView";
import { getListFornecedor } from "../Fornecedor/FornecedorModelView";

interface FieldConfig {
    label: string;
    type: 'text' | 'select' | 'email' | 'cpf_cnpj' | 'none'; 
    value: any;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    options?: { label: string; value: any }[];
    mask?: (value: any) => string;
    readonly?: boolean;
  }

const ProdutoFormularioView = () => {

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [produto, setProduto] = useState<Record<string, FieldConfig>>({
        id_produto: {
            label: 'Código',
            type: 'text',
            value: id??'0',
            readonly: true
        },
        id_fornecedor: {
            label: '',
            type: 'none',
            value: '1'
        },
        tx_nome: {
            label: 'Nome (obrigatório)',
            type: 'text',
            value: '',
            required: true,
            minLength: 3,
            maxLength: 100
        },
        tx_marca: {
            label: 'Marca',
            type: 'text',
            value: '',
            minLength: 0,
            maxLength: 100
        },
        vr_preco_compra: {
            label: 'Valor de Compra (obrigatório)',
            type: 'text',
            value: maskDinheiro('0'),
            required: true,
            minLength: 1,
            maxLength: 15,
            mask: maskDinheiro
        },
        vr_preco_venda: {
            label: 'Valor de Venda (obrigatório)',
            type: 'text',
            value: maskDinheiro('0'),
            required: true,
            minLength: 1,
            maxLength: 15,
            mask: maskDinheiro
        }
    })

    useEffect(() => {
        async function fetchProduto() {

            const fornecedores:any = await getListFornecedor();

            if(!fornecedores || !fornecedores.length){
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: "Nenhum fornecedor encontrado. Por favor cadastre um fornecedor para poder cadastrar um produto.",
                }).then((value) => {if(value.isConfirmed) navigate('/fornecedores')})
            }

            if (id) {
                const data = await getProduto(id.toString());
    
                const newProduto = { ...produto };
    
                for (const key in newProduto) {
                    if (Object.prototype.hasOwnProperty.call(newProduto, key)) {
                        const field = newProduto[key] as FieldConfig;
                    
                        const rawValue = data?.[key];
                    
                        newProduto[key] = {
                        ...field,
                        value: field.mask ? field.mask(rawValue) : rawValue ?? field.value,
                        options: key === 'id_fornecedor' ? fornecedores : (field.options||[])
                        };
                    }
                    }
                    
                setProduto(newProduto);
            }else{
                const newProduto = { ...produto , id_fornecedor: {
                    ...produto.id_fornecedor,
                    options: fornecedores
                }};

                setProduto(newProduto);
            }
        }
    
        fetchProduto();
    }, []);

    return (
        <Screen title={produto?.id_produto?.value !== '0' ? "Editar Produto" : "Cadastrar Produto"} backApplication="/produtos">
            <BootstrapForm 
                isNew={produto?.id_produto?.value === '0'?true:false}
                fields={produto}
                onNew={() => {navigate('/produtos/novo');window.location.reload()}}
                onCreate={async (value) => {
                const response = await createProduto(value);
                if(response.success){

                    const newId = response.id;

                    Swal.fire({
                        title: "Sucesso!",
                        text: response.message,
                        icon: "success",
                        draggable: true
                      }).then(() => {
                        navigate(`/produtos/${newId}`)
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
                const response = await putProduto(value);
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
                    text: 'Tem certeza que deseja excluir o Produto?',
                    icon: "info",
                    draggable: true,
                    showCancelButton: true
                  }).then(async (value) => {
                    if(!value.isConfirmed){
                        return;
                    }

                    const response = await deleteProduto(produto.id_produto.value);

                    if(response.success){
                        Swal.fire({
                            title: "Sucesso!",
                            text: response.message,
                            icon: "success",
                            draggable: true
                          }).then(() => {
                            navigate('/produtos');
                          })
                    }else{
                        Swal.fire({
                            title: "Erro!",
                            text: 'Erro ao tentar excluir produto.',
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

export default ProdutoFormularioView;
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Screen from "../../components/Screen";
import BootstrapForm from "../../components/Form";
import { createItemCompra, getItemCompra, deleteItemCompra, putItemCompra } from "./CompraModelView";
import { getListEstoque } from "../Estoque/EstoqueModelView";
import { maskDinheiro, unmaskValor } from "../../utils/Mask";
import { getProduto } from "../Produto/ProdutoModelView";

interface FieldConfig {
    label: string;
    type: 'text' | 'select' | 'email' | 'cpf_cnpj' | 'number' | 'none'; 
    value: any;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    options?: { label: string; value: any }[];
    mask?: (value: any) => string;
    readonly?: boolean;
  }

const CompraItemFormularioView = () => {

    const navigate = useNavigate();
    const { id, id_item } = useParams<{ id: string, id_item: string }>();

    console.log("id: ", id);
    console.log("id_item: ", id_item);

    const [compra_produto, setCompraProduto] = useState<Record<string, FieldConfig>>({
        id_compra: {
            label: '',
            type: 'none',
            value: id??'0'
        },
        id_compra_produto: {
            label: 'Código',
            type: 'text',
            value: id_item??'0',
            readonly: true
        },
        id_estoque: {
            label: 'Produtos (obrigatório)',
            type: 'select',
            value: '',
            options: [],
            required: true
        },
        nu_quantidade: {
            label: 'Quantidade',
            type: 'number',
            value: 1,
            required: true
        },
        vr_total: {
            label: 'Valor Total',
            type: 'text',
            value: maskDinheiro('0'),
            readonly: true,
            mask: maskDinheiro
        }
    })

    useEffect(() => {
        async function fetchItemCompra() {

            const estoques:any = await getListEstoque();
            console.log(estoques);

            if(!estoques || !estoques.length){
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: "Nenhum Estoque encontrado. Por favor cadastre um Estoque para poder cadastrar um Item da Compra.",
                }).then((value) => {if(value.isConfirmed) navigate('/estoques')})
            }

            if (id && id_item) {
                const res = await getItemCompra(id?.toString(), id_item?.toString());

                console.log(res?.data?.data[0])

                const data = res?.data?.data[0];
    
                let newCompra = { ...compra_produto };

                console.log("ID ESTOQUE: ", data?.id_estoque);

                newCompra = { 
                    ...compra_produto , 
                    id_estoque: {
                    ...compra_produto.id_estoque,
                    options: estoques,
                    value: data?.id_estoque
                    },
                    nu_quantidade: {
                        ...compra_produto.nu_quantidade,
                        value: data?.nu_quantidade
                    },
                    vr_total: {
                        ...compra_produto.vr_total,
                        value: maskDinheiro(data?.vr_total)
                    }
                };
                console.log(newCompra)
                setCompraProduto(newCompra);
            }else{
                const newItemCompra = { ...compra_produto , id_estoque: {
                    ...compra_produto.id_estoque,
                    options: estoques
                }};

                setCompraProduto(newItemCompra);
            }
        }
    
        fetchItemCompra();
    }, []);

    return (
        <Screen title={compra_produto?.id_compra_produto?.value !== '0' ? "Editar Item da Compra" : "Cadastrar Item da Compra"} backApplication={`/compra-itens/${id}`}>
            <BootstrapForm 
                isNew={compra_produto?.id_compra_produto?.value === '0'?true:false}
                fields={compra_produto}
                onNew={() => {navigate(`/compra-itens/novo/${id}`);window.location.reload()}}
                onCreate={async (value) => {
                value.id_compra = id;
                compra_produto.id_estoque.options?.forEach((element) => {
                    if(element.value == value.id_estoque)
                        value.id_produto = element.label.split(' - ')[0]; 
                })
                const response = await createItemCompra(value);
                if(response.success){

                    Swal.fire({
                        title: "Sucesso!",
                        text: response.message,
                        icon: "success",
                        draggable: true
                      }).then(() => {
                        window.parent.location.reload()
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
                console.log(compra_produto.id_estoque)
                value.id_produto = compra_produto.id_estoque.options?.filter((opt) => {return opt.value == value.id_estoque})[0].label.split(' - ')[0];

                const response = await putItemCompra(value);
                if(response.success){

                    Swal.fire({
                        title: "Sucesso!",
                        text: response.message,
                        icon: "success",
                        draggable: true
                      }).then(() => {
                        window.parent.location.reload()
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
                    text: 'Tem certeza que deseja excluir o Item da Compra?',
                    icon: "info",
                    draggable: true,
                    showCancelButton: true
                  }).then(async (value) => {
                    if(!value.isConfirmed){
                        return;
                    }

                    const response = await deleteItemCompra(id?id:'0', compra_produto?.id_compra_produto.value);

                    if(response.success){
                        Swal.fire({
                            title: "Sucesso!",
                            text: response.message,
                            icon: "success",
                            draggable: true
                          }).then(() => {
                            window.parent.location.reload()
                          })
                    }else{
                        Swal.fire({
                            title: "Erro!",
                            text: 'Erro ao tentar excluir Item da Compra.',
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

export default CompraItemFormularioView;
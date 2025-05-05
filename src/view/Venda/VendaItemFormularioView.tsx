import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Screen from "../../components/Screen";
import BootstrapForm from "../../components/Form";
import { createItemVenda, getItemVenda, deleteItemVenda, putItemVenda } from "./VendaModelView";
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

const VendaItemFormularioView = () => {

    const navigate = useNavigate();
    const { id, id_item } = useParams<{ id: string, id_item: string }>();

    console.log("id: ", id);
    console.log("id_item: ", id_item);

    const [venda_produto, setVendaProduto] = useState<Record<string, FieldConfig>>({
        id_venda: {
            label: '',
            type: 'none',
            value: id??'0'
        },
        id_venda_produto: {
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
        async function fetchItemVenda() {

            const estoques:any = await getListEstoque();
            console.log(estoques);

            if(!estoques || !estoques.length){
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: "Nenhum Estoque encontrado. Por favor cadastre um Estoque para poder cadastrar um Item da Venda.",
                }).then((value) => {if(value.isConfirmed) navigate('/estoques')})
            }

            if (id && id_item) {
                const res = await getItemVenda(id?.toString(), id_item?.toString());

                console.log(res?.data?.data[0])

                const data = res?.data?.data[0];
    
                let newVenda = { ...venda_produto };

                console.log("ID ESTOQUE: ", data?.id_estoque);

                newVenda = { 
                    ...venda_produto , 
                    id_estoque: {
                    ...venda_produto.id_estoque,
                    options: estoques,
                    value: data?.id_estoque
                    },
                    nu_quantidade: {
                        ...venda_produto.nu_quantidade,
                        value: data?.nu_quantidade
                    },
                    vr_total: {
                        ...venda_produto.vr_total,
                        value: maskDinheiro(data?.vr_total)
                    }
                };
                console.log(newVenda)
                setVendaProduto(newVenda);
            }else{
                const newItemVenda = { ...venda_produto , id_estoque: {
                    ...venda_produto.id_estoque,
                    options: estoques
                }};

                setVendaProduto(newItemVenda);
            }
        }
    
        fetchItemVenda();
    }, []);

    return (
        <Screen title={venda_produto?.id_venda_produto?.value !== '0' ? "Editar Item da Venda" : "Cadastrar Item da Venda"} backApplication={`/venda-itens/${id}`}>
            <BootstrapForm 
                isNew={venda_produto?.id_venda_produto?.value === '0'?true:false}
                fields={venda_produto}
                onNew={() => {navigate(`/venda-itens/novo/${id}`);window.location.reload()}}
                onCreate={async (value) => {
                value.id_venda = id;
                venda_produto.id_estoque.options?.forEach((element) => {
                    if(element.value == value.id_estoque)
                        value.id_produto = element.label.split(' - ')[0]; 
                })
                const response = await createItemVenda(value);
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
                console.log(venda_produto.id_estoque)
                value.id_produto = venda_produto.id_estoque.options?.filter((opt) => {return opt.value == value.id_estoque})[0].label.split(' - ')[0];

                const response = await putItemVenda(value);
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
                    text: 'Tem certeza que deseja excluir o Item da Venda?',
                    icon: "info",
                    draggable: true,
                    showCancelButton: true
                  }).then(async (value) => {
                    if(!value.isConfirmed){
                        return;
                    }

                    const response = await deleteItemVenda(id?id:'0', venda_produto?.id_venda_produto.value);

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
                            text: 'Erro ao tentar excluir Item da Venda.',
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

export default VendaItemFormularioView;
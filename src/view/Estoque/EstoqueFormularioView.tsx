import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Screen from "../../components/Screen";
import BootstrapForm from "../../components/Form";
import { createEstoque, getEstoque, deleteEstoque, putEstoque } from "./EstoqueModelView";
import { getListProduto } from "../Produto/ProdutoModelView";

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


const EstoqueFormularioView = () => {

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [estoque, setEstoque] = useState<Record<string, FieldConfig>>({
        id_estoque: {
            label: 'Código',
            type: 'text',
            value: id??'0',
            readonly: true
        },
        id_produto: {
            label: 'Fornecedor (obrigatório)',
            type: 'select',
            value: '',
            options: [],
            required: true
        },
        nu_quantidade: {
            label: 'Quantidade (obrigatório)',
            type: 'number',
            value: 0,
            required: true
        }
    })

    useEffect(() => {
        async function fetchEstoque() {

            const produtos:any = await getListProduto();

            if(!produtos || !produtos.length){
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: "Nenhum produto encontrado. Por favor cadastre um produto para poder cadastrar um estoque.",
                }).then((value) => {if(value.isConfirmed) navigate('/produtos')})
            }

            if (id) {
                const data = await getEstoque(id.toString());
    
                const newEstoque = { ...estoque };
    
                for (const key in newEstoque) {
                    if (Object.prototype.hasOwnProperty.call(newEstoque, key)) {
                        const field = newEstoque[key] as FieldConfig;
                    
                        const rawValue = data?.[key];
                    
                        newEstoque[key] = {
                        ...field,
                        value: field.mask ? field.mask(rawValue) : rawValue ?? field.value,
                        options: key === 'id_produto' ? produtos : (field.options||[])
                        };
                    }
                    }
                    
                setEstoque(newEstoque);
            }else{
                const newEstoque = { ...estoque , id_produto: {
                    ...estoque.id_produto,
                    options: produtos
                }};

                setEstoque(newEstoque);
            }
        }
    
        fetchEstoque();
    }, []);

    return (
        <Screen title={estoque?.id_estoque?.value !== '0' ? "Editar Estoque" : "Cadastrar Estoque"} backApplication="/estoques">
            <BootstrapForm 
                isNew={estoque?.id_estoque?.value === '0'?true:false}
                fields={estoque}
                onNew={() => {navigate('/estoques/novo');window.location.reload()}}
                onCreate={async (value) => {
                const response = await createEstoque(value);
                if(response.success){

                    const newId = response.id;

                    Swal.fire({
                        title: "Sucesso!",
                        text: response.message,
                        icon: "success",
                        draggable: true
                      }).then(() => {
                        navigate(`/estoques/${newId}`)
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
                const response = await putEstoque(value);
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
                    text: 'Tem certeza que deseja excluir o Estoque?',
                    icon: "info",
                    draggable: true,
                    showCancelButton: true
                  }).then(async (value) => {
                    if(!value.isConfirmed){
                        return;
                    }

                    const response = await deleteEstoque(estoque.id_estoque.value);

                    if(response.success){
                        Swal.fire({
                            title: "Sucesso!",
                            text: response.message,
                            icon: "success",
                            draggable: true
                          }).then(() => {
                            navigate('/estoques');
                          })
                    }else{
                        Swal.fire({
                            title: "Erro!",
                            text: 'Erro ao tentar excluir estoque.',
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

export default EstoqueFormularioView;
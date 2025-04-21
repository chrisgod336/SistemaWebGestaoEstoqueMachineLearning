import { useState } from "react";

import Screen from "../../components/Screen";

const ProdutoFormularioView = () => {

    const [produto, setProduto] = useState({
        id_produto: {
            value: 0
        }
    })

    return (
        <Screen title={produto?.id_produto?.value ? "Editar Produto" : "Cadastrar Produto"} backApplication="/produtos">
            ProdutoFormularioView
        </Screen>
    );
}

export default ProdutoFormularioView;
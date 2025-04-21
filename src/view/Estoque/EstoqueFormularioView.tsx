import { useState } from "react";

import Screen from "../../components/Screen";

const EstoqueFormularioView = () => {

    const [estoque, setEstoque] = useState({
        id_estoque: {
            value: 0
        }
    })

    return (
        <Screen title={estoque?.id_estoque?.value ? 'Editar Estoque' : 'Cadastrar Estoque'} backApplication="/estoques">
            <div>EstoqueFormularioView</div>
        </Screen>
    );
}

export default EstoqueFormularioView;
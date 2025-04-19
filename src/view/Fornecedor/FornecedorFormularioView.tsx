import { useState } from "react";

import Screen from "../../components/Screen";

const FornecedorFormularioView = () => {

    const [fornecedor, setFornecedor] = useState({
        id_fornecedor: {
            value: 0
        }
    })

    return (
        <Screen title={fornecedor?.id_fornecedor?.value ? 'Editar Fornecedor' : 'Cadastrar Fornecedor'}>
            <div>FornecedorFormularioView</div>
        </Screen>
    );
}

export default FornecedorFormularioView;
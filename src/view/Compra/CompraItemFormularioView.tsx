import { useState } from "react";

import Screen from "../../components/Screen";

const CompraItemFormularioView = () => {

    const [compraItem, setCompraItem] = useState({
        id_compra_produto: {
            value: 0
        }
    });

    return (
        <Screen title={compraItem?.id_compra_produto?.value ? 'Editar Item da Compra' : 'Cadastrar Item da Compra'}>
            <div>CompraItemFormularioView</div>
        </Screen>
    );
}

export default CompraItemFormularioView;
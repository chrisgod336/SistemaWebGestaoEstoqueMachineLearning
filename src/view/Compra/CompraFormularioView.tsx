import { useState } from "react";

import Screen from "../../components/Screen";

const CompraFormularioView = () => {

    const [compra, setCompra] = useState({
        id_compra: {
            value: 0
        }
    });

    return (
        <Screen title={compra?.id_compra?.value ? 'Editar Compra' : 'Cadastrar Compra'} backApplication="/compras">
            <div>CompraFormularioView</div>
        </Screen>
    );
}

export default CompraFormularioView;
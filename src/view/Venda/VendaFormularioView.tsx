import { useState } from "react";

import Screen from "../../components/Screen";

const VendaFormularioView = () => {

    const [venda, setVenda] = useState({
        id_venda: {
            value: 0,
        }
    })

    return (
        <Screen title={venda?.id_venda?.value ? "Editar Venda" : "Cadastrar Venda"} backApplication="/vendas">
            <div>VendaFormularioView</div>
        </Screen>
    );
}

export default VendaFormularioView;
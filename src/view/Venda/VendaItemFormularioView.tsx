import { useState } from "react";

import Screen from "../../components/Screen";

const VendaItemFormularioView = () => {

    const [vendaItem, setVendaItem] = useState({
        id_venda_produto: {
            value: 0
        }
    })

    return (
       <Screen title={vendaItem?.id_venda_produto?.value ? "Editar Item da Venda" : "Cadastrar Item da Venda"}>
            <div>VendaItemFormularioView</div>
       </Screen>
    );
}

export default VendaItemFormularioView;
import { useState } from "react";

import Screen from "../../components/Screen";

const ClienteFormularioView = () => {

    const [cliente, setCliente] = useState({
            id_cliente: {
                value: 0
            }
        });

    return(
    <Screen title={cliente?.id_cliente?.value ? 'Editar Cliente' : 'Cadastrar Cliente'}>
        <div>
            ClienteFormularioView
        </div>
    </Screen>
    );
}

export default ClienteFormularioView;
import { useState, useEffect } from "react";

import Screen from "../../components/Screen";
import BootstrapGrid from "../../components/Grid";
import { getAllCliente } from "./ClienteModelView";

const ClienteConsultaView = () => {

    const [clientes, setClientes] = useState([]); 

    useEffect(() => {
        getAllCliente(setClientes);
    }, []);

    return (
        <Screen title="Clientes" backButton={false}>
            <BootstrapGrid data={clientes} newApp="/clientes/novo"/>
        </Screen>
    );
}

export default ClienteConsultaView;
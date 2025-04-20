import { useState, useEffect } from "react";

import Screen from "../../components/Screen";
import BootstrapGrid from "../../components/Grid";
import { getAllVenda } from "./VendaModelView";

const VendaConsultaView = () => {

    const [vendas, setVendas] = useState([]);

    useEffect(() => {
        getAllVenda(setVendas);
    }, [])

    return (
        <Screen title="Vendas" backButton={false}>
            <BootstrapGrid data={vendas} newApp="/vendas/novo"/>
        </Screen>
    );
}

export default VendaConsultaView;
import { useState, useEffect } from "react";

import Screen from "../../components/Screen";
import BootstrapGrid from "../../components/Grid";
import { getAllEstoque } from "./EstoqueModelView";

const EstoqueConsultaView = () => {

    const [estoques, setEstoques] = useState([]);

    useEffect(() => {
        getAllEstoque(setEstoques);
    }, [])

    return (
        <Screen title="Estoques" backButton={false}>
            <BootstrapGrid data={estoques} newApp="/estoques/novo"/>
        </Screen>
    );
}

export default EstoqueConsultaView;
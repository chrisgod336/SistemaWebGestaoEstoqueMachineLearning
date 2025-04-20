import { useState, useEffect } from "react";

import Screen from "../../components/Screen";
import BootstrapGrid from "../../components/Grid";
import { getAllCompra } from "./CompraModelView";

const CompraConsultaView = () => {

    const [compras, setCompras] = useState([]);

    useEffect(() => {
        getAllCompra(setCompras);
    }, []);

    return (
        <Screen title="Compras" backButton={false}>
            <BootstrapGrid data={compras} newApp="/compras/novo"/>
        </Screen>
    );
}

export default CompraConsultaView;
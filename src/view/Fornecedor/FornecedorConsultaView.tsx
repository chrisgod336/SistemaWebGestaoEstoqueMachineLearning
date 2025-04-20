import { useState, useEffect } from "react";

import Screen from "../../components/Screen";
import BootstrapGrid from "../../components/Grid";
import { getAllFornecedor } from "./FornecedorModelView";

const FornecedorConsultaView = () => {

    const [fornecedores, setFornecedores] = useState([]);

    useEffect(() => {
        getAllFornecedor(setFornecedores);
    }, [])

    return (
        <Screen title="Fornecedores" backButton={false}>
            <BootstrapGrid data={fornecedores} newApp="/fornecedores/novo"/>
        </Screen>
    );
}

export default FornecedorConsultaView;
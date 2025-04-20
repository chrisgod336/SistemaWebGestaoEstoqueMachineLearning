import { useState, useEffect } from "react";

import Screen from "../../components/Screen";
import BootstrapGrid from "../../components/Grid";
import { getAllProduto } from "./ProdutoModelView";

const ProdutoConsultaView = () => {

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        getAllProduto(setProdutos);
    }, [])

    return (
        <Screen title="Produtos" backButton={false}>
            <BootstrapGrid data={produtos} newApp="/produtos/novo"/>
        </Screen>
    );
}

export default ProdutoConsultaView;
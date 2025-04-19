import Screen from "../../components/Screen";
import BootstrapGrid from "../../components/Grid";

const ProdutoConsultaView = () => {
    return (
        <Screen title="Produtos" backButton={false}>
            <BootstrapGrid newApp="/produtos/novo"/>
        </Screen>
    );
}

export default ProdutoConsultaView;
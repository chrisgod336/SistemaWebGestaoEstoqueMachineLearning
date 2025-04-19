import Screen from "../../components/Screen";
import BootstrapGrid from "../../components/Grid";

const FornecedorConsultaView = () => {
    return (
        <Screen title="Fornecedores" backButton={false}>
            <BootstrapGrid newApp="/fornecedores/novo"/>
        </Screen>
    );
}

export default FornecedorConsultaView;
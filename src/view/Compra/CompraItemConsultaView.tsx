import Screen from "../../components/Screen";
import BootstrapGrid from "../../components/Grid";

const CompraItemConsultaView = () => {
    return (
        <Screen title="Itens da Compra" backButton={false}>
            <BootstrapGrid newApp="/compra-itens/novo"/>
        </Screen>
    );
}

export default CompraItemConsultaView;
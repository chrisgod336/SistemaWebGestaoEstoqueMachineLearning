import Screen from "../../components/Screen";
import BootstrapGrid from "../../components/Grid";

const VendaItemConsultaView = () => {
    return (
        <Screen title="Itens da Venda" backButton={false}>
            <BootstrapGrid newApp="/venda-itens/novo"/>
        </Screen>
    );
}

export default VendaItemConsultaView;
import Screen from "../../components/Screen";
import BootstrapGrid from "../../components/Grid";

const VendaConsultaView = () => {
    return (
        <Screen title="Vendas" backButton={false}>
            <BootstrapGrid newApp="/vendas/novo"/>
        </Screen>
    );
}

export default VendaConsultaView;
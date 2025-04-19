import Screen from "../../components/Screen";
import BootstrapGrid from "../../components/Grid";

const ClienteConsultaView = () => {
    return (
        <Screen title="Clientes" backButton={false}>
            <BootstrapGrid newApp="/clientes/novo"/>
        </Screen>
    );
}

export default ClienteConsultaView;
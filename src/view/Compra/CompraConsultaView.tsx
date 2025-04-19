import Screen from "../../components/Screen";
import BootstrapGrid from "../../components/Grid";

const CompraConsultaView = () => {
    return (
        <Screen title="Compras" backButton={false}>
            <BootstrapGrid newApp="/compras/novo"/>
        </Screen>
    );
}

export default CompraConsultaView;
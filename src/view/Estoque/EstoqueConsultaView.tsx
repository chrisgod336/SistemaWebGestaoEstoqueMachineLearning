import Screen from "../../components/Screen";
import BootstrapGrid from "../../components/Grid";

const EstoqueConsultaView = () => {
    return (
        <Screen title="Estoques" backButton={false}>
            <BootstrapGrid newApp="/estoques/novo"/>
        </Screen>
    );
}

export default EstoqueConsultaView;
import BootstrapGrid from "../../components/Grid";
import Screen from "../../components/Screen";

const CompraItemConsultaView = () => {      
    return (
        <Screen backButton={false} title="Itens da Compra">
            <BootstrapGrid newApp="/compra-itens/novo" data={[]}/>
        </Screen>
    );
}

export default CompraItemConsultaView;
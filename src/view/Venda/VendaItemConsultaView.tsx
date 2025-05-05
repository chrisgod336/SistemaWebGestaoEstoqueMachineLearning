import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

import Screen from "../../components/Screen";
import BootstrapGrid from "../../components/Grid";
import { getAllItemVenda } from "./VendaModelView";

const VendaItemConsultaView = () => {

    const [itemVenda, setItemVenda] = useState([]);
        
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        getAllItemVenda(setItemVenda, id?id:'0');
    },[])

    return (
        <Screen backButton={false} title="Itens da Venda">
            <BootstrapGrid newApp={`/venda-itens/novo/${id}`} data={itemVenda}/>
        </Screen>
    );
}

export default VendaItemConsultaView;
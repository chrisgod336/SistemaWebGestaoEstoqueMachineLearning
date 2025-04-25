import BootstrapGrid from "../../components/Grid";
import Screen from "../../components/Screen";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";

import { getAllItemCompra } from "./CompraModelView";

const CompraItemConsultaView = () => {  

    const [itemCompra, setItemCompra] = useState([]);
    
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        getAllItemCompra(setItemCompra, id?id:'0');
    },[])

    return (
        <Screen backButton={false} title="Itens da Compra">
            <BootstrapGrid newApp={`/compra-itens/novo/${id}`} data={itemCompra}/>
        </Screen>
    );
}

export default CompraItemConsultaView;
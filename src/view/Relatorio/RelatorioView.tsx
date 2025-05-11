import { CSSProperties, useState, useEffect } from 'react';
import Screen from '../../components/Screen';
import BootstrapGrid from '../../components/Grid';

import { getNexSixMonths } from '../Relatorio/RelatorioModelView';

const RelatoirioView = () => {

  const [compra, setCompra] = useState([]);
  const [venda, setVenda] = useState([]);
  const [estoque, setEstoque] = useState([]);

  useEffect(() => {
    getNexSixMonths(setCompra, setVenda, setEstoque, 0);
  }, []);

  return (

      <Screen title='Relatórios' backButton={false}>
        <h3 className="mb-0" style={{marginTop: 50}}>Relatório de Previsão de Demanda (Próximos 6 meses)</h3>
        <BootstrapGrid data={venda} newApp=''/>
        <h3 className="mb-0" style={{marginTop: 50}}>Relatório de Otimização de Inventário (Próximos 6 meses)</h3>
        <BootstrapGrid data={estoque} newApp=''/>
        <h3 className="mb-0" style={{marginTop: 50}}>Relatório de Reabastecimento (Próximos 6 meses)</h3>
        <BootstrapGrid data={compra} newApp=''/>
      </Screen>
  );
};

export default RelatoirioView;
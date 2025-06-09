import { CSSProperties, useState, useEffect } from 'react';
import Screen from '../../components/Screen';
import { LineChart, BarChart } from '../../components/Chart';

import { getNexSixMonths } from './PaginaInicialModelView';

const PaginaInicialView = () => {

  const [compra, setCompra] = useState({
    seriesQtd: [],
    categoriesQtd: [],
    totalQtd: [],
    seriesVr: [],
    categoriesVr: [],
    totalVr: []
  });
  const [venda, setVenda] = useState({
    seriesQtd: [],
    categoriesQtd: [],
    totalQtd: [],
    seriesVr: [],
    categoriesVr: [],
    totalVr: []
  });
  const [estoque, setEstoque] = useState({
    seriesQtd: [],
    categoriesQtd: [],
    totalQtd: [],
    seriesVr: [],
    categoriesVr: [],
    totalVr: []
  });

  useEffect(() => {
    getNexSixMonths(setCompra, setVenda, setEstoque, 10);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <h1 className="mb-0">Dashboards (Top 10 produtos)</h1>
      </div>
      <Screen title='Dashboard de Previsão de Demanda (Próximos 6 meses)' backButton={false}>
        <div style={styles.line}>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Quantidade por Produto</h3>
            <LineChart 
              series={venda.seriesQtd} 
              categories={venda.categoriesQtd} 
            />
          </div>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
          <h3 className="mb-0">Quantidade Total</h3>
            <BarChart 
              data={venda.totalQtd} 
            />
          </div>
        </div>
        <div style={styles.line}>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Valor por Produto</h3>
            <LineChart 
              series={venda.seriesVr} 
              categories={venda.categoriesVr} 
            />
          </div>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Valor Total</h3>
            <BarChart 
              data={venda.totalVr} 
            />
          </div>
        </div>
      </Screen>

      <Screen title='Dashboard de Otimização de Inventário (Próximos 6 meses)' backButton={false}>
        <div style={styles.line}>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Quantidade por Produto</h3>
            <LineChart 
              series={estoque.seriesQtd} 
              categories={estoque.categoriesQtd} 
            />
          </div>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Quantidade por Total</h3>
            <BarChart 
              data={estoque.totalQtd}
            />
          </div>
        </div>
        <div style={styles.line}>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Saldo por Produto</h3>
            <LineChart 
              series={estoque.seriesVr} 
              categories={estoque.categoriesVr}
            />
          </div>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Saldo Total</h3>
            <BarChart 
              data={estoque.totalVr} 
            />
          </div>
        </div>
      </Screen>

      <Screen title='Dashboard de Reabastecimento (Próximos 6 meses)' backButton={false}>
        <div style={styles.line}>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Quantidade por Produto</h3>
            <LineChart 
              series={compra.seriesQtd} 
              categories={compra.categoriesQtd} 
            />
          </div>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Quantidade Total</h3>
            <BarChart 
              data={compra.totalQtd} 
            />
          </div>
        </div>
        <div style={styles.line}>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Valor por Produto</h3>
            <LineChart 
              series={compra.seriesVr} 
              categories={compra.categoriesVr} 
            />
          </div>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Valor Total</h3>
            <BarChart 
              data={compra.totalVr} 
            />
          </div>
        </div>
      </Screen>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '16px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  line: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
    marginTop: '20px',
    width: '100%',
  }
};

export default PaginaInicialView;
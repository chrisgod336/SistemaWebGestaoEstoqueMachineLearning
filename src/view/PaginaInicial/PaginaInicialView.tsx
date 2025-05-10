import { CSSProperties } from 'react';
import Screen from '../../components/Screen';
import { LineChart, BarChart } from '../../components/Chart';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

// Função para formatar números com 2 casas decimais
const formatDecimal = (value: number) => parseFloat(value.toFixed(2));

// Dados de exemplo para o LineChart (10 séries com 6 pontos cada)
const lineChartData = {
  series: Array.from({ length: 10 }, (_, i) => ({
    name: `Produto ${i + 1}`,
    data: Array.from({ length: 6 }, () => formatDecimal(Math.random() * 100 + 20))
  })),
  categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
};

// Dados de exemplo para o BarChart (10 barras)
const barChartData = Array.from({ length: 10 }, (_, i) => ({
  x: `Produto ${i + 1}`,
  y: formatDecimal(Math.random() * 100 + 30)
}));

const PaginaInicialView = () => {
  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <Button type="submit" variant="primary" onClick={() => alert("Recalculando")}>
          <FontAwesomeIcon icon={faRotate} color='#ffff'/>
          {'  Recalcular'}
        </Button>
      </div>

      <Screen title='Dashboard de Previsão de Demanda (Próximos 6 meses)' backButton={false}>
        <div style={styles.line}>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Quantidade por Produto</h3>
            <LineChart 
              series={lineChartData.series} 
              categories={lineChartData.categories} 
            />
          </div>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
          <h3 className="mb-0">Quantidade Total</h3>
            <BarChart 
              data={barChartData} 
            />
          </div>
        </div>
        <div style={styles.line}>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Valor por Produto</h3>
            <LineChart 
              series={lineChartData.series.map(s => ({
                ...s,
                data: s.data.map(value => formatDecimal(value * (Math.random() * 5 + 1)))
              }))} 
              categories={lineChartData.categories} 
            />
          </div>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Valor Total</h3>
            <BarChart 
              data={barChartData.map(item => ({
                ...item,
                y: formatDecimal(item.y * (Math.random() * 5 + 1))
              }))} 
            />
          </div>
        </div>
      </Screen>

      <Screen title='Dashboard de Otimização de Inventário (Próximos 6 meses)' backButton={false}>
        <div style={styles.line}>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Quantidade por Produto</h3>
            <LineChart 
              series={lineChartData.series} 
              categories={lineChartData.categories} 
            />
          </div>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Quantidade por Total</h3>
            <BarChart 
              data={barChartData}
            />
          </div>
        </div>
        <div style={styles.line}>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Valor por Produto</h3>
            <LineChart 
              series={lineChartData.series.map(s => ({
                ...s,
                data: s.data.map(value => formatDecimal(value * (Math.random() * 5 + 1)))
              }))} 
              categories={lineChartData.categories}
            />
          </div>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Valor Total</h3>
            <BarChart 
              data={barChartData.map(item => ({
                ...item,
                y: formatDecimal(item.y * (Math.random() * 5 + 1))
              }))} 
            />
          </div>
        </div>
      </Screen>

      <Screen title='Dashboard de Reabastecimento (Próximos 6 meses)' backButton={false}>
        <div style={styles.line}>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Quantidade por Produto</h3>
            <LineChart 
              series={lineChartData.series} 
              categories={lineChartData.categories} 
            />
          </div>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Quantidade Total</h3>
            <BarChart 
              data={barChartData} 
            />
          </div>
        </div>
        <div style={styles.line}>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Valor por Produto</h3>
            <LineChart 
              series={lineChartData.series.map(s => ({
                ...s,
                data: s.data.map(value => formatDecimal(value * (Math.random() * 5 + 1)))
              }))} 
              categories={lineChartData.categories} 
            />
          </div>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Valor Total</h3>
            <BarChart 
              data={barChartData.map(item => ({
                ...item,
                y: formatDecimal(item.y * (Math.random() * 5 + 1))
              }))} 
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
    justifyContent: 'flex-end',
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
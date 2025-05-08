import { CSSProperties } from 'react';
import Screen from '../../components/Screen';
import { LineChart, BarChart } from '../../components/Chart';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

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
            <LineChart />
          </div>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
          <h3 className="mb-0">Quantidade Total</h3>
            <BarChart />
          </div>
        </div>
        <div style={styles.line}>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Valor por Produto</h3>
            <LineChart />
          </div>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Valor Total</h3>
            <BarChart />
          </div>
        </div>
      </Screen>

      <Screen title='Dashboard de Otimização de Inventário (Próximos 6 meses)' backButton={false}>
        <div style={styles.line}>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Quantidade por Produto</h3>
            <LineChart />
          </div>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Quantidade por Total</h3>
            <BarChart />
          </div>
        </div>
        <div style={styles.line}>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Valor por Produto</h3>
            <LineChart />
          </div>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Valor Total</h3>
            <BarChart />
          </div>
        </div>
      </Screen>

      <Screen title='Dashboard de Reabastecimento (Próximos 6 meses)' backButton={false}>
        <div style={styles.line}>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Quantidade por Produto</h3>
            <LineChart />
          </div>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Quantidade Total</h3>
            <BarChart />
          </div>
        </div>
        <div style={styles.line}>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Valor por Produto</h3>
            <LineChart />
          </div>
          <div style={{width: '50%', padding:20, borderRadius: 10, boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
            <h3 className="mb-0">Valor Total</h3>
            <BarChart />
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

import { CSSProperties } from 'react';
import Screen from '../../components/Screen';
import { LineChart, BarChart } from '../../components/Chart';
import { Button } from 'react-bootstrap';

const PaginaInicialView = () => {
  return (
    <div style={styles.container}>
      <div style={styles.buttonContainer}>
        <Button type="submit" variant="primary" onClick={() => alert("Recalculando")}>
          Recalcular
        </Button>
      </div>

      <Screen title='Dashboard de Previsão de Demanda' backButton={false}>
        <div style={styles.line}>
          <div style={{width: '50%'}}>
            <LineChart />
          </div>
          <div style={{width: '50%'}}>
            <BarChart />
          </div>
        </div>
      </Screen>

      <Screen title='Dashboard de Otimização de Inventário' backButton={false}>
        <div style={styles.line}>
          <div style={{width: '50%'}}>
            <LineChart />
          </div>
          <div style={{width: '50%'}}>
            <BarChart />
          </div>
        </div>
      </Screen>

      <Screen title='Dashboard de Reabastecimento' backButton={false}>
        <div style={styles.line}>
          <div style={{width: '50%'}}>
            <LineChart />
          </div>
          <div style={{width: '50%'}}>
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

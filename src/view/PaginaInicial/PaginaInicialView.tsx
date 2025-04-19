import Image from 'react-bootstrap/Image';
import { CSSProperties } from 'react';

import Screen from '../../components/Screen';
import BootstrapCard from '../../components/Card';

const PaginaInicialView = () => {

  return (
    <Screen title='Página Inicial' backButton={false}>
      <div style={styles.container}>
      <Image src="/assets/images/image1.png" height={'60%'}/>
      <div style={styles.line}>
        <BootstrapCard text='Dashboard de previsão de demanda'/>
        <BootstrapCard text='Dashboard de otimização de inventário'/>
        <BootstrapCard text='Dashboard de reabastecimento'/>
      </div>
      <div style={styles.line}>
        <BootstrapCard text='Relatório de previsão de demanda'/>
        <BootstrapCard text='Relatório de otimização de inventário'/>
        <BootstrapCard text='Relatório de reabastecimento'/>
      </div>
    </div>
    </Screen>
  );
};

const styles: { [key: string]: CSSProperties } = {
    container: {
      display: 'flex',
      flexDirection: 'column', 
      width: '100%',
      height: '100vh',
      alignItems: 'center',
    },
    line: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '16px',
      marginTop: '20px',
      width: '80%' 
    }
  };
  

export default PaginaInicialView;

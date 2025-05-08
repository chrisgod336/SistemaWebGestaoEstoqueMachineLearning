import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

type Props = {
  newApp: string;
  data: Record<string, any>[];
};

function BootstrapGrid({ newApp, data}: Props) {

  const columns = data.length > 0?Object.keys(data[0]):[];

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <Button variant="success" onClick={() => window.location.href = newApp}>
          <FontAwesomeIcon icon={faPlus} color='#ffff'/>
          {'  Novo'}
        </Button>
      </div>
      
      {columns.length === 0?
      <p className="container mt-4">Nenhum registro encontrado.</p>
      :
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {columns.length > 0 && columns.map((col) => (
              <th key={col}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
            ))}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 && data.map((row, idx) => (
            <tr key={idx}>
              {columns.length > 0 && columns.map((col) => (
                <td key={col}>{row[col]}</td>
              ))}
              <td>
                <Button variant="primary" onClick={() => window.location.href = newApp.replace('/novo', '')+'/'+row["Código"]}>
                  <FontAwesomeIcon icon={faEdit} color='#ffff'/>
                  {'  Editar'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      }
    </div>
  );
}

export default BootstrapGrid;

import React from 'react';
import { Button, Table } from 'react-bootstrap';

type Props = {
  newApp: string;
  data: Record<string, any>[];
};

function BootstrapGrid({ newApp, data}: Props) {
  if (data.length === 0) return <p className="container mt-4">Nenhum dado para exibir.</p>;

  const columns = Object.keys(data[0]);

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <Button variant="success" onClick={() => window.location.href = newApp}>
          Novo
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col.charAt(0).toUpperCase() + col.slice(1)}</th>
            ))}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col}>{row[col]}</td>
              ))}
              <td>
                <Button variant="primary" onClick={() => window.location.href = newApp.replace('novo', row["Código"])}>
                  Editar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default BootstrapGrid;

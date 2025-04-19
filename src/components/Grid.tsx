import { Button } from 'react-bootstrap';

function BootstrapGrid({newApp} : {newApp:string}) {
    return (
        <div className="container mt-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <Button variant="success" onClick={() => window.location.href = newApp}>
            Novo
          </Button>
        </div>
      </div>
    );
  }

export default BootstrapGrid;
  
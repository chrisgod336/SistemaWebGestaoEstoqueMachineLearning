import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

type ScreenProps = {
  title: string;
  backButton?: boolean;
  children: ReactNode;
};

function Screen({ title, backButton=true, children }: ScreenProps) {
  const navigate = useNavigate();

  const handleBack = () => navigate(-1);

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="mb-0">{title}</h2>
        <Button variant="secondary" onClick={handleBack} style={{display: backButton ? 'block' : 'none'}}>
          Voltar
        </Button>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default Screen;

import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

type ScreenProps = {
  title: string;
  backButton?: boolean;
  backApplication?:string;
  children: ReactNode;
};

function Screen({ title, backButton=true, backApplication='', children }: ScreenProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if(backApplication.length)
      navigate(backApplication)
    else
      navigate(-1)
  };

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="mb-0">{title}</h2>
        <Button variant="secondary" onClick={handleBack} style={{display: backButton ? 'block' : 'none'}}>
          <FontAwesomeIcon icon={faArrowLeft} color='#ffff'/>
          {'  Voltar'}
        </Button>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default Screen;

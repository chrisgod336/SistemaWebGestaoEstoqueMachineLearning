import Card from 'react-bootstrap/Card';

function BootstrapCard({ text }: { text: string }) {
    return (
      <Card
        bg={'secondary'}
        key={'secondary'}
        text={'white'}
        style={{ width: '18rem' }}
        className="mb-2"
      >
        <Card.Body>
          <Card.Title>{text}</Card.Title>
        </Card.Body>
      </Card>
    );
  }

export default BootstrapCard;
  
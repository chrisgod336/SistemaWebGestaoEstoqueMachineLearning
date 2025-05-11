import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink, useNavigate } from 'react-router-dom';

function BootstrapNavBar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNavigate = (path: string) => {
    navigate(path);
    handleClose();
  };

  return (
    <Navbar expand="xll" bg="light" variant="light" className="mb-3">
      <Container fluid>
        <div className="d-flex align-items-center gap-2">
          <Navbar.Toggle 
            aria-controls="offcanvasNavbar-expand-xxl"
            onClick={handleShow}
          />
          <Navbar.Brand as={NavLink} to="/" className="mb-0">
            Gestor de Estoque
          </Navbar.Brand>
        </div>

        <Navbar.Offcanvas
          show={show}
          onHide={handleClose}
          id="offcanvasNavbar-expand-xxl"
          aria-labelledby="offcanvasNavbarLabel-expand-xxl"
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-xxl">
              Gestor de Estoque
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="flex-grow-1 flex-column">
              <Nav.Link onClick={() => handleNavigate('/')}>Dashboards</Nav.Link>
              <Nav.Link onClick={() => handleNavigate('/Relatorio')}>Relatórios</Nav.Link>
              <Nav.Link onClick={() => handleNavigate('/fornecedores')}>Fornecedores</Nav.Link>
              <Nav.Link onClick={() => handleNavigate('/clientes')}>Clientes</Nav.Link>
              <Nav.Link onClick={() => handleNavigate('/produtos')}>Produtos</Nav.Link>
              <Nav.Link onClick={() => handleNavigate('/estoques')}>Estoque</Nav.Link>
              <Nav.Link onClick={() => handleNavigate('/vendas')}>Vendas</Nav.Link>
              <Nav.Link onClick={() => handleNavigate('/compras')}>Compras</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default BootstrapNavBar;

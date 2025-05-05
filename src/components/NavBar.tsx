import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
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
              <Nav.Link onClick={() => handleNavigate('/')}>Página inicial</Nav.Link>
              <Nav.Link onClick={() => handleNavigate('/fornecedores')}>Fornecedores</Nav.Link>
              <Nav.Link onClick={() => handleNavigate('/clientes')}>Clientes</Nav.Link>
              <Nav.Link onClick={() => handleNavigate('/produtos')}>Produtos</Nav.Link>
              <Nav.Link onClick={() => handleNavigate('/estoques')}>Estoque</Nav.Link>
              <Nav.Link onClick={() => handleNavigate('/vendas')}>Vendas</Nav.Link>
              <Nav.Link onClick={() => handleNavigate('/compras')}>Compras</Nav.Link>

              {/* <NavDropdown title="Dashboards" id="offcanvasNavbarDropdown-expand-xxl">
                <NavDropdown.Item onClick={() => handleNavigate('/dashboard/previsao-demanda')}>
                  Dashboard de previsão de demanda
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleNavigate('/dashboard/otimizacao-inventario')}>
                  Dashboard de otimização de inventário
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleNavigate('/dashboard/reabastecimento')}>
                  Dashboard de reabastecimento
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Relatório" id="offcanvasNavbarDropdown-expand-xxl">
                <NavDropdown.Item onClick={() => handleNavigate('/relatorio/previsao-demanda')}>
                  Relatório de previsão de demanda
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleNavigate('/relatorio/otimizacao-inventario')}>
                  Relatório de otimização de inventário
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleNavigate('/relatorio/reabastecimento')}>
                  Relatório de reabastecimento
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default BootstrapNavBar;

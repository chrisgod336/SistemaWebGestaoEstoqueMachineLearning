import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function BootstrapNavBar() {
  return (
    <Navbar expand="xll" bg="light" variant="light" className="mb-3">
      <Container fluid>

        <div className="d-flex align-items-center gap-2">
          <Navbar.Toggle 
            aria-controls="offcanvasNavbar-expand-xxl"
          />
          <Navbar.Brand href="#" className="mb-0">Gestor de Estoque</Navbar.Brand>
        </div>

        <Navbar.Offcanvas
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
            <Nav className="flex-grow-1">
              <Nav.Link href="#">Página inicial</Nav.Link>
              <Nav.Link href="#action2">Fornecedores</Nav.Link>
              <Nav.Link href="#action3">Clientes</Nav.Link>
              <Nav.Link href="#action4">Produtos</Nav.Link>
              <Nav.Link href="#action5">Estoque</Nav.Link>
              <Nav.Link href="#action6">Vendas</Nav.Link>
              <Nav.Link href="#action7">Compras</Nav.Link>

              <NavDropdown 
                title="Dashboards" 
                id="offcanvasNavbarDropdown-expand-xxl"
              >
                <NavDropdown.Item href="#action9">Dashboard de previsão de demanda</NavDropdown.Item>
                <NavDropdown.Item href="#action10">Dashboard de otimização de inventário</NavDropdown.Item>
                <NavDropdown.Item href="#action11">Dashboard de reabastecimento</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown 
                title="Relatório" 
                id="offcanvasNavbarDropdown-expand-xxl"
              >
                <NavDropdown.Item href="#action12">Relatório de previsão de demanda</NavDropdown.Item>
                <NavDropdown.Item href="#action13">Relatório de otimização de inventário</NavDropdown.Item>
                <NavDropdown.Item href="#action14">Relatório de reabastecimento</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default BootstrapNavBar;

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import BootstrapNavBar from './components/NavBar';
import PaginaInicialView from './view/PaginaInicial/PaginaInicialView';

import ClienteConsultaView from './view/Cliente/ClienteConsultaView';
import ClienteFormularioView from './view/Cliente/ClienteFormularioView';

import CompraConsultaView from './view/Compra/CompraConsultaView';
import CompraFormularioView from './view/Compra/CompraFormularioView';

import CompraItemConsultaView from './view/Compra/CompraItemConsultaView';
import CompraItemFormularioView from './view/Compra/CompraItemFormularioView';

import EstoqueConsultaView from './view/Estoque/EstoqueConsultaView';
import EstoqueFormularioView from './view/Estoque/EstoqueFormularioView';

import FornecedorConsultaView from './view/Fornecedor/FornecedorConsultaView';
import FornecedorFormularioView from './view/Fornecedor/FornecedorFormularioView';

import ProdutoConsultaView from './view/Produto/ProdutoConsultaView';
import ProdutoFormularioView from './view/Produto/ProdutoFormularioView';

import VendaConsultaView from './view/Venda/VendaConsultaView';
import VendaFormularioView from './view/Venda/VendaFormularioView';
import VendaItemConsultaView from './view/Venda/VendaItemConsultaView';
import VendaItemFormularioView from './view/Venda/VendaItemFormularioView';

const AppContent = () => {
  const location = useLocation();

  // Rotas que não devem exibir o menu
  const semMenu = location.pathname.startsWith('/venda-itens') || location.pathname.startsWith('/compra-itens');

  return (
    <>
      {!semMenu && <BootstrapNavBar />}
      <div className={semMenu ? '' : 'container mt-4'}>
        <Routes>
          <Route path="/" element={<PaginaInicialView />} />

          {/* Cliente */}
          <Route path="/clientes" element={<ClienteConsultaView />} />
          <Route path="/clientes/novo" element={<ClienteFormularioView />} />
          <Route path="/clientes/:id" element={<ClienteFormularioView />} />

          {/* Compra */}
          <Route path="/compras" element={<CompraConsultaView />} />
          <Route path="/compras/novo" element={<CompraFormularioView />} />
          <Route path="/compras/:id" element={<CompraFormularioView />} />

          {/* Compra Item */}
          <Route path="/compra-itens/:id" element={<CompraItemConsultaView />} />
          <Route path="/compra-itens/novo/:id" element={<CompraItemFormularioView />} />
          <Route path="/compra-itens/:id/:id_item" element={<CompraItemFormularioView />} />

          {/* Estoque */}
          <Route path="/estoques" element={<EstoqueConsultaView />} />
          <Route path="/estoques/novo" element={<EstoqueFormularioView />} />
          <Route path="/estoques/:id" element={<EstoqueFormularioView />} />

          {/* Fornecedor */}
          <Route path="/fornecedores" element={<FornecedorConsultaView />} />
          <Route path="/fornecedores/novo" element={<FornecedorFormularioView />} />
          <Route path="/fornecedores/:id" element={<FornecedorFormularioView />} />

          {/* Produto */}
          <Route path="/produtos" element={<ProdutoConsultaView />} />
          <Route path="/produtos/novo" element={<ProdutoFormularioView />} />
          <Route path="/produtos/:id" element={<ProdutoFormularioView />} />

          {/* Venda */}
          <Route path="/vendas" element={<VendaConsultaView />} />
          <Route path="/vendas/novo" element={<VendaFormularioView />} />
          <Route path="/vendas/:id/:id_item" element={<VendaFormularioView />} />

          {/* Venda Item */}
          <Route path="/venda-itens/:id" element={<VendaItemConsultaView />} />
          <Route path="/venda-itens/novo/:id" element={<VendaItemFormularioView />} />
          <Route path="/venda-itens/:id/:id_item" element={<VendaItemFormularioView />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;

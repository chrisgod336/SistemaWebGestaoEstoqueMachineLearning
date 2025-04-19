import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const App = () => {
  return (
    <Router>
      <BootstrapNavBar />
      <div className="container mt-4">
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
          <Route path="/compra-itens" element={<CompraItemConsultaView />} />
          <Route path="/compra-itens/novo" element={<CompraItemFormularioView />} />
          <Route path="/compra-itens/:id" element={<CompraItemFormularioView />} />

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
          <Route path="/vendas/:id" element={<VendaFormularioView />} />

          {/* Venda Item */}
          <Route path="/venda-itens" element={<VendaItemConsultaView />} />
          <Route path="/venda-itens/novo" element={<VendaItemFormularioView />} />
          <Route path="/venda-itens/:id" element={<VendaItemFormularioView />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;

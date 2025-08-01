import {
  UserCircleIcon,
  ClipboardDocumentListIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import './Sidebar.css';

const SidebarComponent = () => {
  return (
    <aside className="sidebar-card">
      <div className="sidebar-logo">
        <img
          src="/Banner-novo-Mobile-caca-e-pesca-agronutry.png"
          alt="Agronutry"
        />
      </div>
      <nav className="sidebar-list">
        <Link to="/consulta">
          <div className="sidebar-item">
            <UserCircleIcon className="sidebar-icon" />
            Consulta de Clientes
          </div>
        </Link>
        <Link to="/consulta-venda">
          <div className="sidebar-item">
            <ClipboardDocumentListIcon className="sidebar-icon" />
            Histórico de Vendas
          </div>
        </Link>
        <Link to="/formulario">
          <div className="sidebar-item">
            <PlusCircleIcon className="sidebar-icon" />
            Cadastro de Clientes
          </div>
        </Link>
        <Link to="/cadastrarVenda">
          <div className="sidebar-item">
            <ShoppingCartIcon className="sidebar-icon" />
            Cadastro de Vendas
          </div>
        </Link>
      </nav>
    </aside>
  );
};

export default SidebarComponent;
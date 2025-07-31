import React from "react";
import { Sidebar, Menu, MenuItem, Logo } from "react-mui-sidebar";
import "./Sidebar.css";

const SidebarComponent = () => {
  return (
    <Sidebar width={"240px"}>
      <Logo
        img="/Banner-novo-Mobile-caca-e-pesca-agronutry.png"
        className="logoImg"
      >
        Agronutry
      </Logo>
      <Menu subHeading="NAVEGAÇÃO">
        <MenuItem link="/consulta">Consulta de Clientes</MenuItem>
        <MenuItem link="/consulta-venda">Histórico </MenuItem>
        <MenuItem link="/formulario">Cadastro de Clientes</MenuItem>
        <MenuItem link="/cadastrarVenda">Cadastro de Vendas</MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default SidebarComponent;
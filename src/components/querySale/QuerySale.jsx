import { useEffect, useState } from "react";
import "./querySale.css";

export default function QuerySale() {
  const [vendas, setVendas] = useState([]);
  const [vendasOriginais, setVendasOriginais] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [filtroCliente, setFiltroCliente] = useState("");
  const [filtroVendedor, setFiltroVendedor] = useState("");
  const [filtroData, setFiltroData] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Buscando vendas
        const resVendas = await fetch("https://sheetdb.io/api/v1/amt6dto3zbvtt");
        const dataVendas = await resVendas.json();
        // Buscando clientes
        const resClientes = await fetch("https://sheetdb.io/api/v1/yygwqezaas6r7");
        const dataClientes = await resClientes.json();

        setVendas(dataVendas);
        setVendasOriginais(dataVendas);
        setClientes(dataClientes);
      } catch (error) {
        setErro("Erro ao buscar dados.");
      } finally {
        setCarregando(false);
      }
    }
    fetchData();
  }, []);

  // Filtro
  const handleFilter = (e) => {
    e.preventDefault();
    let filtradas = vendasOriginais;

    if (filtroCliente) {
      filtradas = filtradas.filter(v => v.cliente && v.cliente.toLowerCase().includes(filtroCliente.toLowerCase()));
    }
    if (filtroVendedor) {
      filtradas = filtradas.filter(v => v.vendedor && v.vendedor === filtroVendedor);
    }
    if (filtroData) {
      filtradas = filtradas.filter(v => v.dataVenda && v.dataVenda === filtroData);
    }
    setVendas(filtradas);
  };

  // Estatísticas por vendedor
  const estatisticasVendedor = vendasOriginais.reduce((acc, venda) => {
    if (!venda.vendedor) return acc;
    if (!acc[venda.vendedor]) acc[venda.vendedor] = { total: 0, valor: 0 };
    acc[venda.vendedor].total += 1;
    const valorNum = Number((venda.valor || "0").replace(/[^\d,]/g, "").replace(",", "."));
    acc[venda.vendedor].valor += isNaN(valorNum) ? 0 : valorNum;
    return acc;
  }, {});

  return (
    <div className="query-sale">
      <h1>Histórico de Compras & Vendas</h1>
      <form className="search-sale" onSubmit={handleFilter}>
        <select
          value={filtroCliente}
          onChange={e => setFiltroCliente(e.target.value)}
        >
          <option value="">Todos os Clientes</option>
          {clientes.map(c => (
            <option key={c.id} value={c.nome}>{c.nome}</option>
          ))}
        </select>
        <select
          value={filtroVendedor}
          onChange={e => setFiltroVendedor(e.target.value)}
        >
          <option value="">Todos os Vendedores</option>
          {[...new Set(vendasOriginais.map(v => v.vendedor).filter(Boolean))].map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
        <input
          type="date"
          value={filtroData}
          onChange={e => setFiltroData(e.target.value)}
        />
        <button type="submit">Filtrar</button>
        <button
          type="button"
          className="clear-btn"
          onClick={() => {
            setFiltroCliente("");
            setFiltroVendedor("");
            setFiltroData("");
            setVendas(vendasOriginais);
          }}
        >
          Limpar
        </button>
      </form>

      {carregando && <p className="loading">Carregando...</p>}
      {erro && <p className="error">{erro}</p>}

      <div className="dashboard">
        <div className="dashboard-card">
          <h2>Total de Vendas</h2>
          <span>{vendasOriginais.length}</span>
        </div>
        <div className="dashboard-card">
          <h2>Valor Total</h2>
          <span>
            R$ {vendasOriginais.reduce((acc, v) => {
              const valorNum = Number((v.valor || "0").replace(/[^\d,]/g, "").replace(",", "."));
              return acc + (isNaN(valorNum) ? 0 : valorNum);
            }, 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="dashboard-card">
          <h2>Vendas por Vendedor</h2>
          <ul>
            {Object.entries(estatisticasVendedor).map(([vendedor, stats]) => (
              <li key={vendedor}>
                <strong>{vendedor}:</strong> {stats.total} vendas (R$ {stats.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })})
              </li>
            ))}
          </ul>
        </div>
      </div>

      <table className="sale-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Cliente</th>
            <th>Produto</th>
            <th>Quantidade</th>
            <th>Valor</th>
            <th>Vendedor</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((venda, idx) => (
            <tr key={idx}>
              <td>{venda.dataVenda}</td>
              <td>{venda.cliente}</td>
              <td>{venda.produto}</td>
              <td>{venda.quantidade}</td>
              <td>{venda.valor}</td>
              <td>{venda.vendedor}</td>
              <td>{venda.observacoes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
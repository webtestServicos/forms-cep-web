import { useEffect, useState } from "react";
import "./queryCustomer.css";

export default function QueryCustomer() {
    const [clientes, setClientes] = useState([]);
    const [clientesOriginais, setClientesOriginais] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        async function fetchClientes() {
            try {
                const response = await fetch("https://sheetdb.io/api/v1/yygwqezaas6r7");
                const data = await response.json();
                if (response.ok) {
                    setClientes(data);
                    setClientesOriginais(data);
                } else {
                    setErro("Erro ao carregar clientes.");
                    console.log("Erro:", data);
                }
            } catch (error) {
                setErro("Erro ao buscar clientes.");
            } finally {
                setCarregando(false);
            }
        }
        fetchClientes();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.elements.query.value.toLowerCase();
        if (!query) {
            setClientes(clientesOriginais);
            return;
        }
        const filteredClientes = clientesOriginais.filter(cliente =>
            (cliente.nome && cliente.nome.toLowerCase().includes(query)) ||
            (cliente.id && cliente.id.toLowerCase().includes(query)) ||
            (cliente.documento && cliente.documento.toLowerCase().includes(query))
        );
        setClientes(filteredClientes);
    };

    return (
        <div>
            <h1>Consulta de Clientes</h1>
            <p>Esta página permitirá que você consulte os clientes cadastrados.</p>
            <form className="search-customer" onSubmit={handleSearch}>
                <input type="text" name="query" placeholder="Buscar por nome, ID ou CPF/CNPJ..." />
                <button type="submit">Buscar</button>
            </form>
            {carregando && <p>Carregando...</p>}
            {erro && <p style={{ color: "red" }}>{erro}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Documento</th>
                        <th>CEP</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.id}>
                            <td>{cliente.id}</td>
                            <td>{cliente.nome}</td>
                            <td>{cliente.telefone}</td>
                            <td>{cliente.documento}</td>
                            <td>{cliente.cep}</td>
                            <td>{cliente.cidade}</td>
                            <td>{cliente.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
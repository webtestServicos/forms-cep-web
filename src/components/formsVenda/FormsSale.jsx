import { useState, useEffect } from "react";

function formatPrice(value) {
    value = value.replace(/\D/g, '');
    value = value.padStart(3, '0');
    value = value.replace(/(\d+)(\d{2})$/, '$1,$2');
    value = value.replace(/^0+(\d)/, '$1');
    return 'R$' + value;
}

function generateUniqueId() {
    return (Math.random().toString(36).substr(2, 9)).toUpperCase();
}

export default function FormsSale() {
    const [produto, setProduto] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [valor, setValor] = useState("");
    const [dataVenda, setDataVenda] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [vendedor, setVendedor] = useState("");
    const [ cliente, setCliente] = useState("");
    const [clientes, setClientes] = useState([]);
    const [clientesOriginais, setClientesOriginais] = useState([]);
    const [erro, setErro] = useState(null);
    const [busca, setBusca] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://sheetdb.io/api/v1/yygwqezaas6r7");
                const data = await response.json();
                if (response.ok) {
                    setClientes(data);
                    setClientesOriginais(data);
                } else {
                    setErro(new Error("Erro ao buscar dados"));
                    console.log("Erro:", data);
                }
            } catch (error) {
                setErro(error);
            }
        };
        fetchData();
    }, []);

    const handleSubmitSale = async (e) => {
    e.preventDefault();

    // Busca o cliente selecionado pelo id
    const clienteSelecionado = clientes.find(c => c.id === cliente);

    const saleData = {
        produto,
        quantidade,
        valor,
        dataVenda,
        observacoes,
        vendedor,
        cliente: clienteSelecionado ? clienteSelecionado.nome : "",
        id: generateUniqueId(),
        idCliente: clienteSelecionado ? clienteSelecionado.id : ""
    };

    try {
        const response = await fetch("https://sheetdb.io/api/v1/amt6dto3zbvtt", {
            method: "POST",
            body: JSON.stringify({ data: saleData }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            alert("Venda cadastrada com sucesso!");
            setProduto("");
            setQuantidade("");
            setValor("");
            setDataVenda("");
            setObservacoes("");
            setVendedor("");
            setCliente("");
        } else {
            throw new Error("Erro ao cadastrar venda");
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao cadastrar venda.");
    }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const query = busca.toLowerCase();
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
        <div className="formsSale">
            <form onSubmit={handleSubmitSale}>
                <h1>Cadastro de Vendas</h1>
                <p>Preencha os dados abaixo para cadastrar uma nova venda.</p>

                <label htmlFor="produto">
                    Produto:
                    <input
                        type="text"
                        id="produto"
                        name="produto"
                        required
                        value={produto}
                        onChange={e => setProduto(e.target.value)}
                    />
                </label>
                <label htmlFor="quantidade">
                    Quantidade:
                    <input
                        type="number"
                        id="quantidade"
                        name="quantidade"
                        required
                        value={quantidade}
                        onChange={e => setQuantidade(e.target.value)}
                    />
                </label>
                <label htmlFor="valor">
                    Valor:
                    <input
                        type="text"
                        id="valor"
                        name="valor"
                        required
                        value={valor}
                        onChange={e => setValor(formatPrice(e.target.value))}
                    />
                </label>
                <label htmlFor="dataVenda">
                    Data da Venda:
                    <input
                        type="date"
                        id="dataVenda"
                        name="dataVenda"
                        required
                        value={dataVenda}
                        onChange={e => setDataVenda(e.target.value)}
                    />
                </label>

                {/* Busca de clientes */}
                <div className="search-customer" style={{marginBottom: 8}}>
                    <input
                        type="text"
                        name="query"
                        placeholder="Buscar por nome, ID ou CPF/CNPJ..."
                        value={busca}
                        onChange={e => setBusca(e.target.value)}
                    />
                    <button type="button" onClick={handleSearch}>Buscar</button>
                </div>

                <label htmlFor="cliente">
                    Cliente:
                    <select
                        id="cliente"
                        name="cliente"
                        required
                        value={cliente}
                        onChange={e => setCliente(e.target.value)}
                    >
                        <option value="">Selecione o Cliente</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nome}
                            </option>
                        ))}
                    </select>
                </label>
                <label htmlFor="observacoes">
                    Observações:
                    <textarea
                        id="observacoes"
                        name="observacoes"
                        rows="4"
                        value={observacoes}
                        onChange={e => setObservacoes(e.target.value)}
                    ></textarea>
                </label>
                <label htmlFor="vendedor">
                    Vendedor:
                    <select
                        id="vendedor"
                        name="vendedor"
                        required
                        value={vendedor}
                        onChange={e => setVendedor(e.target.value)}
                    >
                        <option value="">Selecione o Vendedor</option>
                        <option value="Ozielton">Ozielton</option>
                        <option value="João Miguel">João Miguel</option>
                        <option value="Gustavo">Gustavo</option>
                        <option value="Francis">Francis</option>
                    </select>
                </label>
                <button type="submit">Cadastrar Venda</button>
            </form>
        </div>
    );
}
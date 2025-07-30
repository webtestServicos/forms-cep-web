import { useState, useEffect, use } from "react";
import './SectionFormsGun.css';

function formatPrice(value) {
    // Remove tudo que não for número
    value = value.replace(/\D/g, '');

    // Garante pelo menos 3 dígitos para separar os centavos
    value = value.padStart(3, '0');

    // Separa os centavos
    value = value.replace(/(\d+)(\d{2})$/, '$1,$2');

    // Remove zeros à esquerda do valor principal
    value = value.replace(/^0+(\d)/, '$1');

    // Adiciona o R$
    return 'R$' + value;
}


function generateUniqueId() {
    return (  
        Math.random().toString(36).substr(2, 9)
    ).toUpperCase();
}


export default function SectionFormsGun() {
    const [produto, setProduto] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [valor, setValor] = useState("");
    const [dataVenda, setDataVenda] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [vendedor, setVendedor] = useState("");
    const [cliente, setCliente] = useState("");
    const [clientes, setClientes] = useState([]);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://sheetdb.io/api/v1/yygwqezaas6r7");
                const data = await response.json();
                if (response.ok) {
                    setClientes(data);
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

        const saleData = {
            produto,
            quantidade,
            valor,
            dataVenda,
            observacoes,
            vendedor,
            cliente,
            id: generateUniqueId(),
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

    return (
        <div className="section-forms-gun">
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
                            <option key={cliente.id} value={cliente.nome}>
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
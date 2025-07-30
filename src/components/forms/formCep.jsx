import { useState } from "react";
import "./forms.css";

// Função para formatar telefone (xx)xxxxx-xxxx
function formatTelefone(value) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1)$2")
    .replace(/(\d{5})(\d{1,4})$/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
}

// Função para formatar CPF ou CNPJ
function formatDocumento(value) {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 11) {
    // CPF: xxx.xxx.xxx-xx
    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    // CNPJ: xxx.xxx.xxx/xxxx-xx
    return numbers
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  }
}

// Função para formatar CEP xxxxx-xxx
function formatCep(value) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");
}

export default function FormularioGoogleSheets() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [documento, setDocumento] = useState("");
  const [inscricaoEstadual, setInscricaoEstadual] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [complemento, setComplemento] = useState("");
  const [observacao, setObservacao] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      nome: nome,
      telefone: telefone,
      email: email,
      documento: documento,
      inscricaoEstadual: inscricaoEstadual,
      cep: cep,
      logradouro: logradouro,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      complemento: complemento,
      observacao: observacao,
    };

    try {
      const response = await fetch("https://sheetdb.io/api/v1/yygwqezaas6r7", {
        method: "POST",
        body: JSON.stringify({ data: formData }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        setMensagem("Dados enviados com sucesso!");
        setNome("");
        setTelefone("");
        setEmail("");
        setDocumento("");
        setInscricaoEstadual("");
        setCep("");
        setLogradouro("");
        setNumero("");
        setBairro("");
        setCidade("");
        setComplemento("");
        setObservacao("");
      } else {
        setMensagem("Erro ao enviar dados.");
        console.error("Erro:", result);
      }
    } catch (error) {
      console.error("Erro:", error);
      setMensagem("Erro na comunicação com a planilha.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Telefone"
        value={telefone}
        maxLength={15}
        onChange={(e) => setTelefone(formatTelefone(e.target.value))}
        required
      />
      <input
        type="text"
        placeholder="Documento (CPF ou CNPJ)"
        value={documento}
        maxLength={18}
        onChange={(e) => setDocumento(formatDocumento(e.target.value))}
        required
      />
      <input
        type="text"
        placeholder="CEP"
        value={cep}
        maxLength={9}
        onChange={(e) => setCep(formatCep(e.target.value))}
        required
      />
      <input
        type="text"
        placeholder="Logradouro (rua, avenida, etc.)"
        value={logradouro}
        onChange={(e) => setLogradouro(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Número"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Bairro"
        value={bairro}
        onChange={(e) => setBairro(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Cidade"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Complemento (opcional)"
        value={complemento}
        onChange={(e) => setComplemento(e.target.value)}
      />
      <textarea
        placeholder="Observação (opcional)"
        value={observacao}
        onChange={(e) => setObservacao(e.target.value)}
      />
      <button type="submit">Enviar</button>
      {mensagem && <p>{mensagem}</p>}
    </form>
  );
}
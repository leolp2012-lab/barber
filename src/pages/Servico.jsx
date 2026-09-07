import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/barberIMG.svg";

function Servico() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [duracao, setDuracao] = useState("");
  const [servicos, setServicos] = useState([]);

  const carregarServicos = async () => {
    try {
      const resposta = await fetch("http://localhost:3000/servicos");
      const dados = await resposta.json();

      setServicos(dados);
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    }
  };

  useEffect(() => {
    carregarServicos();
  }, []);

  const cadastrarServico = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch("http://localhost:3000/servicos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          descricao,
          preco,
          duracao: Number(duracao),
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.erro || "Erro ao cadastrar serviço");
        return;
      }

      alert("Serviço cadastrado com sucesso!");

      setNome("");
      setDescricao("");
      setPreco("");
      setDuracao("");

      carregarServicos();
    } catch (error) {
      alert("Não foi possível conectar ao servidor.");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card service-register-card">
        <Link to="/" className="back-arrow">
          ←
        </Link>

        <img src={logo} alt="BarberFlow" className="logo" />

        <p className="subtitle">EST. 2026</p>

        <h2 className="service-register-title">CADASTRAR SERVIÇO</h2>

        <p className="service-register-subtitle">
          Adicione um novo serviço à barbearia
        </p>

        <form onSubmit={cadastrarServico}>
          <div className="input-group">
            <label>Nome do serviço</label>

            <input
              type="text"
              placeholder="Ex: Corte Masculino"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Descrição</label>

            <input
              type="text"
              placeholder="Ex: Corte tradicional"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div className="service-fields-row">
            <div className="input-group">
              <label>Preço</label>

              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="40.00"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Duração</label>

              <input
                type="number"
                min="1"
                placeholder="30"
                value={duracao}
                onChange={(e) => setDuracao(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="confirm-btn">
            CADASTRAR SERVIÇO
          </button>
        </form>

        <div className="registered-services">
          <h3>SERVIÇOS CADASTRADOS</h3>

          {servicos.length === 0 ? (
            <p className="empty-services">Nenhum serviço cadastrado.</p>
          ) : (
            <div className="registered-services-list">
              {servicos.map((servico) => (
                <div key={servico.id} className="registered-service-card">
                  <div className="registered-service-icon">
                    {getIcon(servico.nome)}
                  </div>
                  <div className="registered-service-info">
                    <strong>{servico.nome}</strong>

                    {servico.descricao && <span>{servico.descricao}</span>}

                    <div className="registered-service-details">
                      <span>{servico.duracao} min</span>

                      <span>R$ {servico.preco}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
const getIcon = (nome) => {
  const nomeServico = nome.toLowerCase();

  if (nomeServico.includes("barba") || nomeServico.includes("navalha")) {
    return "🪒";
  }

  if (
    nomeServico.includes("sobrancelha") ||
    nomeServico.includes("pinça") ||
    nomeServico.includes("pinca")
  ) {
    return "🎯";
  }

  return "✂️";
};

export default Servico;

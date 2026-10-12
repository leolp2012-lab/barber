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

function BeardIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 19 Q9 15 10 25 Q11 37 24 42 Q37 37 38 25 Q39 15 33 19" />
      <path d="M15 22 Q18 29 24 29 Q30 29 33 22" />
      <path d="M18 34 Q24 38 30 34" />
      <path d="M18 17 L21 20 M30 17 L27 20" />
    </svg>
  );
}

function ScissorsIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="12" r="6" />
      <circle cx="11" cy="36" r="6" />
      <path d="M16 16 L37 37 M16 32 L37 11" />
    </svg>
  );
}

function TweezersIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 7 L35 39" />
      <path d="M19 7 L38 34" />
      <path d="M12 7 L7 4 L9 13 L17 14" />
      <path d="M19 7 L15 3 L16 12 L23 15" />
    </svg>
  );
}

const getIcon = (nome) => {
  const nomeServico = nome.toLowerCase();

  if (nomeServico.includes("barba") || nomeServico.includes("navalha")) {
    return <BeardIcon />;
  }

  if (
    nomeServico.includes("sobrancelha") ||
    nomeServico.includes("pinça") ||
    nomeServico.includes("pinca")
  ) {
    return <TweezersIcon />;
  }

  return <ScissorsIcon />;
};

export default Servico;

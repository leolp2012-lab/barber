import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profissionais() {
  const [profissionais, setProfissionais] = useState([]);
  const [nome, setNome] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const carregarProfissionais = async () => {
    try {
      const resposta = await fetch("http://localhost:3000/profissionais");
      const dados = await resposta.json();
      setProfissionais(dados);
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao carregar profissionais.");
    }
  };

  useEffect(() => {
    carregarProfissionais();
  }, []);

  const cadastrarProfissional = async (event) => {
    event.preventDefault();
    setMensagem("");
    setCarregando(true);

    try {
      const resposta = await fetch("http://localhost:3000/profissionais", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, especialidade, descricao, foto }),
      });

      const dados = await resposta.json();
      if (!resposta.ok)
        throw new Error(dados.erro || "Erro ao cadastrar profissional");

      setMensagem("Profissional cadastrado com sucesso!");
      setNome("");
      setEspecialidade("");
      setDescricao("");
      setFoto("");
      carregarProfissionais();
    } catch (error) {
      setMensagem(error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card service-register-card professionals-register-card">
        <Link to="/" className="back-arrow">
          ←
        </Link>

        <h2 className="service-register-title">CADASTRAR PROFISSIONAL</h2>

        <form onSubmit={cadastrarProfissional}>
          <div className="input-group">
            <label>NOME DO PROFISSIONAL</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Carlos Silva"
              required
            />
          </div>

          <div className="input-group">
            <label>ESPECIALIDADE</label>
            <input
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
              placeholder="Ex: Barbeiro"
              required
            />
          </div>

          <div className="input-group">
            <label>DESCRIÇÃO</label>
            <textarea
              placeholder="Ex: Especialista em cortes modernos e barba completa"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              maxLength={200}
              rows={3}
            />
            <small>{descricao.length}/200 caracteres</small>
          </div>

          <div className="input-group">
            <label>URL DA FOTO</label>
            <input
              type="url"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
              placeholder="https://exemplo.com/foto.jpg"
            />
          </div>

          <button type="submit" className="confirm-btn" disabled={carregando}>
            {carregando ? "CADASTRANDO..." : "CADASTRAR PROFISSIONAL"}
          </button>
        </form>

        {mensagem && <p className="message">{mensagem}</p>}

        {/* LISTA DE PROFISSIONAIS CADASTRADOS */}
        <div className="prof-registered-section">
          <h3>PROFISSIONAIS CADASTRADOS</h3>

          {profissionais.length === 0 ? (
            <p className="empty-services">Nenhum profissional cadastrado.</p>
          ) : (
            <div className="prof-registered-list">
              {profissionais.map((prof) => (
                <div key={prof.id} className="prof-registered-card">
                  <div className="prof-registered-photo-box">
                    {prof.foto ? (
                      <img
                        src={prof.foto}
                        alt={prof.nome}
                        className="prof-registered-photo-3x4"
                      />
                    ) : (
                      <div className="prof-registered-photo-placeholder">
                        👤
                      </div>
                    )}
                  </div>

                  <div className="prof-registered-info">
                    <strong>{prof.nome}</strong>
                    <span className="prof-registered-specialty">
                      {prof.especialidade}
                    </span>
                    <span className="prof-registered-desc">
                      {prof.descricao || "Profissional"}
                    </span>
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

export default Profissionais;

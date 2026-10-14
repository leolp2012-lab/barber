import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ServiceSelector from "../components/ServiceSelector";
import Schedule from "../components/Schedule";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import logo from "../assets/barberIMG.svg";

function Home({ user, setUser }) {
  const getShortName = (fullName) => {
    if (!fullName) return "";

    const names = fullName.trim().split(/\s+/);

    if (names.length === 1) {
      return names[0];
    }

    const firstName = names[0];
    const lastNameInitial = names[names.length - 1].charAt(0).toUpperCase();

    return `${firstName} ${lastNameInitial}.`;
  };

  const [selectedServices, setSelectedServices] = useState({});
  const [selectedTime, setSelectedTime] = useState(null);

  // Estado para armazenar os profissionais vindos do banco de dados (API)
  const [profissionais, setProfissionais] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  const [date, setDate] = useState(new Date());
  const [reservas, setReservas] = useState([]);

  // Busca os profissionais cadastrados no backend ao carregar a tela
  useEffect(() => {
    async function carregarProfissionais() {
      try {
        const resposta = await fetch("http://localhost:3000/profissionais");
        const dados = await resposta.json();
        setProfissionais(dados);

        // Seleciona o primeiro profissional automaticamente por padrão
        if (dados && dados.length > 0) {
          setSelectedProfessional(dados[0].nome);
        }
      } catch (error) {
        console.error("Erro ao carregar profissionais:", error);
      }
    }

    carregarProfissionais();
  }, []);

  const handleServiceChange = (category, option) => {
    setSelectedServices((prev) => ({ ...prev, [category]: option }));
  };

  const times = Array.from({ length: 10 }, (_, i) => {
    const hora = 10 + i;
    const timeString = `${hora}:00`;
    return {
      value: timeString,
      label: timeString,
      reserved: reservas.some(
        (r) =>
          r.professional === selectedProfessional &&
          r.date === date.toDateString() &&
          r.time === timeString,
      ),
    };
  });

  const confirmarAgendamento = () => {
    if (date.getDay() === 1) {
      alert("Não é possível agendar nas segundas-feiras!");
      return;
    }
    if (!selectedTime) {
      alert("Selecione um horário!");
      return;
    }

    const newBooking = {
      professional: selectedProfessional,
      date: date.toDateString(),
      time: selectedTime,
      services: { ...selectedServices },
    };

    setReservas([...reservas, newBooking]);
    setSelectedTime(null);
    alert(`Agendamento confirmado:\n
      Profissional: ${newBooking.professional}\n
      Data: ${newBooking.date}\n
      Horário: ${newBooking.time}\n
      Serviços: ${Object.values(selectedServices).join(", ") || "Nenhum"}`);
  };

  return (
    <div className="home-container">
      <div className="app-card">
        <div className="top-bar">
          {user ? (
            <>
              <span className="user-name-top">{getShortName(user)}</span>

              <button className="login-btn-top" onClick={() => setUser(null)}>
                🚪 Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-btn-top">
                👤 Login &gt;
              </Link>

              <Link to="/register" className="login-btn-top">
                📝 Cadastre-se &gt;
              </Link>
            </>
          )}
        </div>
        <header>
          <img src={logo} alt="Barber Flow" className="logo" />
          <p className="subtitle">EST. 2026</p>
        </header>

        {/* Seção de Serviços */}
        <div className="services-grid">
          <ServiceSelector
            selectedServices={selectedServices}
            onSelectService={handleServiceChange}
          />
        </div>

        {/* TÍTULO DA SEÇÃO PROFISSIONAIS */}
        <h2 className="section-title">PROFISSIONAIS</h2>

        {/* LISTA DINÂMICA DE PROFISSIONAIS DO BANCO */}
        <div className="professionals-tabs">
          {profissionais.length === 0 ? (
            <p className="empty-msg">Nenhum profissional cadastrado.</p>
          ) : (
            profissionais.map((prof) => (
              <div
                key={prof.id}
                className={`prof-card ${selectedProfessional === prof.nome ? "active" : ""}`}
                onClick={() => setSelectedProfessional(prof.nome)}
              >
                <img
                  src={prof.foto || "https://via.placeholder.com/100"}
                  alt={prof.nome}
                  className="prof-img"
                />

                {/* Nome com o mesmo estilo do título dos serviços (ex: Barba, Corte) */}
                <span className="card-title">{getShortName(prof.nome)}</span>

                {/* Especialidade com o mesmo estilo do valor dos serviços (ex: R$ 25) */}
                <span className="card-price">
                  {prof.especialidade || "Barbeiro"}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Calendário e Horários */}
        <div className="calendar-container">
          <Calendar
            onChange={setDate}
            value={date}
            locale="pt-BR"
            tileDisabled={({ date }) => date.getDay() === 1}
            tileClassName={({ date }) => {
              if (date.getDay() === 1) return "dia-bloqueado";
              const booked = reservas.some(
                (r) => r.date === date.toDateString(),
              );
              return booked ? "dia-ocupado" : null;
            }}
          />

          <Schedule
            professional={selectedProfessional}
            times={times}
            selectedTime={selectedTime}
            onSelectTime={setSelectedTime}
          />

          <button className="confirm-btn" onClick={confirmarAgendamento}>
            Confirmar Agendamento
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

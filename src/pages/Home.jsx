import React, { useState } from "react";
import { Link } from "react-router-dom";
import ServiceSelector from "../components/ServiceSelector";
import Schedule from "../components/Schedule";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import logo from "../assets/barberIMG.svg";

import profA from "../assets/proFA.png";
import profB from "../assets/proFB.png";
import profC from "../assets/proFC.png";

function Home({ user, setUser }) {
  const [selectedServices, setSelectedServices] = useState({});
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedProfessional, setSelectedProfessional] = useState("Carlos Silva");
  const [date, setDate] = useState(new Date());
  const [reservas, setReservas] = useState([]);

  const handleServiceChange = (category, option) => {
    setSelectedServices(prev => ({ ...prev, [category]: option }));
  };

  const times = Array.from({ length: 10 }, (_, i) => {
    const hora = 10 + i;
    const timeString = `${hora}:00`;
    return {
      value: timeString,
      label: timeString,
      reserved: reservas.some(
        r =>
          r.professional === selectedProfessional &&
          r.date === date.toDateString() &&
          r.time === timeString
      )
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
      services: { ...selectedServices }
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
            <button className="login-btn-top" onClick={() => setUser(null)}>
              🚪 Sair
            </button>
          ) : (
            <>
              <Link to="/login" className="login-btn-top">👤 Login &gt;</Link>
              <Link to="/register" className="login-btn-top">📝 Cadastre-se &gt;</Link>
            </>
          )}
        </div>

       <header>
  <img src={logo} alt="Barber Flow" className="logo" />
  <p className="subtitle">EST. 1966</p>
  
  {/* Mensagem exibida logo abaixo do EST. 1966 quando o usuário estiver logado */}
 
</header>

        {user && <div className="welcome">Bem-vindo, {user}</div>}

        {/* Serviços */}
        <div className="services-grid">
  <ServiceSelector 
    selectedServices={selectedServices} 
    onSelectService={handleServiceChange} 
  />
</div>

        {/* Profissionais */}
        <div className="professionals-tabs">
          <div
            className={`prof-card ${selectedProfessional === "Carlos Silva" ? "active" : ""}`}
            onClick={() => setSelectedProfessional("Carlos Silva")}
          >
            <img src={profA} alt="Carlos Silva" className="prof-img" />
            <span>Carlos "Navalha de Ouro" Silva</span>
          </div>
          <div
            className={`prof-card ${selectedProfessional === "Rafael Oliveira" ? "active" : ""}`}
            onClick={() => setSelectedProfessional("Rafael Oliveira")}
          >
            <img src={profB} alt="Rafael Oliveira" className="prof-img" />
            <span>Rafael "Mestre do Fade" Oliveira</span>
          </div>
          <div
            className={`prof-card ${selectedProfessional === "João Santos" ? "active" : ""}`}
            onClick={() => setSelectedProfessional("João Santos")}
          >
            <img src={profC} alt="João Santos" className="prof-img" />
            <span>João "Detalhista" Santos</span>
          </div>
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
              const booked = reservas.some(r => r.date === date.toDateString());
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
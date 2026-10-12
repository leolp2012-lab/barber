import React, { useEffect, useState } from "react";

function BeardIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      width="32"
      height="32"
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
      width="32"
      height="32"
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
      width="32"
      height="32"
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
const getServiceIcon = (name) => {
  const serviceName = name.toLowerCase();

  if (serviceName.includes("barba")) {
    return <BeardIcon />;
  }

  if (serviceName.includes("sobrancelha")) {
    return <TweezersIcon />;
  }

  return <ScissorsIcon />;
};

export default function ServiceSelector({
  selectedServices = {},
  onSelectService,
}) {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/servicos")
      .then((res) => res.json())
      .then((data) => {
        const services = data.map((service) => ({
          id: service.id,
          category: "SERVIÇOS",
          name: service.nome,
          price: `R$ ${service.preco}`,
          time: `${service.duracao} min`,
        }));
        setServicesData(services);
      })
      .catch((error) => {
        console.error("Erro ao buscar serviços:", error);
      });
  }, []);

  return (
    <div className="services-container">
      <div className="category-block">
        <h5 className="category-header">SERVIÇOS</h5>

        <div className="cards-grid">
          {servicesData.map((service) => {
            const isSelected =
              selectedServices[service.category] === service.name;

            return (
              <div
                key={service.id}
                className={`service-card ${isSelected ? "selected" : ""}`}
                onClick={() => onSelectService(service.category, service.name)}
              >
                <span className="card-icon">
                  {getServiceIcon(service.name)}
                </span>
                <span className="card-title">{service.name}</span>
                <span className="card-time">{service.time}</span>
                <span className="card-price">{service.price}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

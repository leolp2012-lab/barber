import React, { useEffect, useState } from "react";

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
          icon: "✂️",
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
                <span className="card-icon">{service.icon}</span>
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

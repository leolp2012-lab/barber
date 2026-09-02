import React from "react";

const servicesData = [
  { id: "tradicional", category: "CABELO", name: "Tradicional", price: "R$ 45", time: "30 min", icon: "✂️" },
  { id: "degrade", category: "CABELO", name: "Degradê", price: "R$ 50", time: "40 min", icon: "💈" },
  { id: "estilizado", category: "CABELO", name: "Estilizado", price: "R$ 60", time: "45 min", icon: "✨" },
  { id: "navalha", category: "BARBA", name: "Navalha", price: "R$ 35", time: "25 min", icon: "🪒" },
  { id: "completa", category: "BARBA", name: "Completa", price: "R$ 45", time: "30 min", icon: "🧔🏻‍♂️" },
  { id: "pinca", category: "SOBRANCELHA", name: "Pinça", price: "R$ 20", time: "15 min", icon: "🎯" },
  { id: "depilacao", category: "SOBRANCELHA", name: "Depilação", price: "R$ 25", time: "15 min", icon: "🔥" },
];

export default function ServiceSelector({ selectedServices = {}, onSelectService }) {
  const categories = [...new Set(servicesData.map((s) => s.category))];

  return (
    <div className="services-container">
      {categories.map((cat) => (
        <div key={cat} className="category-block">
          <h5 className="category-header">{cat}</h5>
          <div className="cards-grid">
            {servicesData
              .filter((s) => s.category === cat)
              .map((service) => {
                const isSelected = selectedServices[service.category] === service.name;
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
      ))}
    </div>
  );
}
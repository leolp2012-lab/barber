import React from "react";

function Schedule({ professional, times, selectedTime, onSelectTime }) {
  return (
    <div className="schedule">
      <h3>Agenda de {professional}</h3>
      <div className="time-grid">
        {times.map(t => (
          <button
            key={t.value}
            className={`time-btn ${selectedTime === t.value ? "selected" : ""}`}
            onClick={() => onSelectTime(t.value)}
            disabled={t.reserved}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Schedule;

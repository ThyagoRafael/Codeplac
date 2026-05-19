import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/EventCard.css";

export default function EventCard({
  variant = "cyan",
  title,
  subtitle,
  date,
  time,
  location,
  tipo, // Propriedade nova
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className={`event-card ${variant}`} onClick={() => setOpen(true)}>
        <h4 className="event-title">{title}</h4>
        <p className="event-subtitle">{subtitle}</p>
        <div className="event-divider" />
        <div className="event-meta">
          <span>
            {date} | {time}
          </span>
          <span className="event-location">LOCAL: {location}</span>
        </div>
      </div>

      {open && (
        <div className="event-modal-overlay" onClick={() => setOpen(false)}>
          <div
            className={`event-modal ${variant}`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{title}</h3>
            <p className="modal-subtitle">{subtitle}</p>
            <div className="modal-info">
              <span>
                <strong>Data:</strong> {date}
              </span>
              <span>
                <strong>Horário:</strong> {time}
              </span>
              <span>
                <strong>Local:</strong> {location}
              </span>
            </div>

            {/* BOTÃO APARECE SE FOR COMPETICAO */}
            {tipo === "COMPETICAO" && (
              <button
                className="btn-inscricao-modal"
                onClick={() =>
                  navigate("/inscricao", { state: { nomeEvento: title } })
                }
              >
                INSCREVER EQUIPE
              </button>
            )}

            <button onClick={() => setOpen(false)}>fechar</button>
          </div>
        </div>
      )}
    </>
  );
}

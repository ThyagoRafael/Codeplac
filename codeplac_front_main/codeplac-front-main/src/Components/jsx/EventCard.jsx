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
  tipo,
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* CARD */}
      <div className={`event-card ${variant}`} onClick={() => setOpen(true)}>
        <h4 className="event-title">{title || "EVENTO SEM TÍTULO"}</h4>

        <p className="event-subtitle">{subtitle || "Sem descrição"}</p>

        <div className="event-divider" />

        <div className="event-meta">
          <span>
            {date || "Data indefinida"} | {time || "--:--"}
          </span>

          <span className="event-location">
            LOCAL: {location || "Não informado"}
          </span>
        </div>
      </div>

      {/* MODAL */}
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

            {tipo === "COMPETICAO" && (
              <button
                className="btn-inscricao-modal"
                onClick={() =>
                  navigate("/inscricao", {
                    state: { nomeEvento: title },
                  })
                }
              >
                INSCREVER EQUIPE
              </button>
            )}

            <button onClick={() => setOpen(false)}>FECHAR</button>
          </div>
        </div>
      )}
    </>
  );
}

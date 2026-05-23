import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate";
import "../css/eventos.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import EventCard from "../../Components/jsx/EventCard";
import Circle from "../../Components/jsx/circle";
import eventoBanner from "../../assets/img/eventobanner.png";
import { getAllEvents } from "../../services/eventService";

export default function Eventos() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await getAllEvents();
      setEvents(data);
    };
    loadEvents();
  }, []);

  const groupedEvents = events.reduce((acc, event) => {
    if (!acc[event.dataEvento]) acc[event.dataEvento] = [];
    acc[event.dataEvento].push(event);
    return acc;
  }, {});

  return (
    <div className="events-page">
      <Header />
      <div className="eventos-circles-bg">
        <Circle size={400} variant="purple" className="eventos-circle-left" />
        <Circle size={400} variant="cyan" className="eventos-circle-right" />
      </div>

      <main className="events-container">
        <section className="events-hero">
          <h1>Eventos</h1>
          <p>
            Descubra nossos eventos de programação. Fique ligado na semana
            acadêmica!
          </p>
        </section>

        <section className="event-schedule">
          <div className="event-schedule-container">
            <div className="event-banner">
              <img src={eventoBanner} alt="Banner" />
            </div>
            <div className="event-info">
              <h2>
                CRONOGRAMA DO <span>EVENTO</span>
              </h2>

              <div className="schedule-text">
                <p>
                  <strong>25 DE MAIO:</strong> Abertura da Semana Acadêmica
                  (aberta a todos os cursos). Todos os alunos de T.I. devem se
                  dirigir aos Laboratórios 7, 9 e 12 (4º andar) antes do início.
                </p>
                <p>
                  <strong>26 DE MAIO:</strong> Competição Codeplac (Laboratórios
                  2/3, 4 e 5) e Hackathon – Formação de Equipes (Auditório
                  Vermelho).
                </p>
                <p>
                  <strong>27 DE MAIO:</strong> Apresentação de Banners; Palestra
                  "Guardião Cibernético" com Geovanne; Ciclo SEBRAE (Design
                  Thinking e IA); Palestra Scrum Além do Básico: Agilidade,
                  Carreira e Mercado, e Painel de Empregabilidade em Tecnologia.
                </p>
                <p>
                  <strong>28 DE MAIO:</strong> Ciclo de palestras SEBRAE no
                  Auditório Vermelho. Foco em inovação, tecnologia e
                  desenvolvimento profissional.
                </p>
                <p>
                  <strong>29 DE MAIO:</strong> Apresentação de Banners,
                  encerramento do Hackathon, palestra SEBRAE sobre "Pitch de
                  Produtos" e palestra sobre Internet das Coisas (IoT).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Título Chamativo Centralizado */}
        <h2 className="section-title">Inscrições abertas - Clique nos cards</h2>

        <section className="events">
          {Object.entries(groupedEvents).map(([day, dayEvents]) => (
            <section key={day} className="events-day">
              <h2 className="event-day">{formatDate(day)}</h2>
              <div className="events-grid">
                {dayEvents.map((event) => (
                  <EventCard
                    key={event.idEvento}
                    variant={"cyan"}
                    title={event.nomeEvento}
                    subtitle={event.descricao}
                    date={event.dataEvento}
                    time={event.horario}
                    location={event.lugar}
                    tipo={event.tipoEvento}
                  />
                ))}
              </div>
            </section>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}

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
            </div>
          </div>
        </section>

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
                    tipo={event.tipoEvento} // PASSANDO O TIPO AQUI
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

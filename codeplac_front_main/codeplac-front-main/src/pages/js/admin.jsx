import { useEffect, useState } from "react";
import "../css/admin.css";
import Header from "../../Components/jsx/header";
import Footer from "../../Components/jsx/footer";
import { getAllUsers, modifyUserFunction } from "../../services/userService";
import {
  getAllEvents,
  createEvent,
  deleteEvent,
} from "../../services/eventService";

export default function Admin() {
  const [showEventForm, setShowEventForm] = useState(false);
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [changedFunction, setChangedFunctions] = useState({});
  const [loading, setLoading] = useState(false);

  const [newEvent, setNewEvent] = useState({
    nomeEvento: "",
    descricao: "",
    dataEvento: "",
    lugar: "",
    horario: "",
    periodo: "MATUTINO",
    tipoEvento: "COMPETICAO",
  });

  const savedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, eventsData] = await Promise.allSettled([
          getAllUsers(savedUser?.token),
          getAllEvents(),
        ]);

        if (usersData.status === "fulfilled") setUsers(usersData.value);
        if (eventsData.status === "fulfilled") setEvents(eventsData.value);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };
    fetchData();
  }, [savedUser?.token]);

  const handleSaveNewUserFunction = async (user) => {
    const newUserFunction = changedFunction[user.cpf];
    if (!newUserFunction || newUserFunction === user.tipoUsuario) {
      alert("Não há mudanças!");
      return;
    }
    try {
      setLoading(true);
      const data = await modifyUserFunction(
        user.cpf,
        savedUser.token,
        newUserFunction,
      );
      setUsers((prev) =>
        prev.map((u) =>
          u.cpf === data.cpf ? { ...u, tipoUsuario: data.tipoUsuario } : u,
        ),
      );
      alert("Função alterada com sucesso!");
    } catch (error) {
      alert("Erro ao alterar função!");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveEvent = async () => {
    if (!newEvent.nomeEvento || !newEvent.dataEvento)
      return alert("Preencha Título e Data!");
    try {
      setLoading(true);
      await createEvent(newEvent, savedUser.token);
      alert("Evento criado com sucesso!");
      setNewEvent({
        nomeEvento: "",
        descricao: "",
        dataEvento: "",
        lugar: "",
        horario: "",
        periodo: "MATUTINO",
        tipoEvento: "COMPETICAO",
      });
      setShowEventForm(false);
      setEvents(await getAllEvents());
    } catch (error) {
      alert("Erro ao criar evento: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Deseja mesmo apagar este evento?")) return;
    try {
      await deleteEvent(id, savedUser.token);
      setEvents(events.filter((e) => e.idEvento !== id));
      alert("Evento removido!");
    } catch (error) {
      alert("Erro ao deletar evento: " + error.message);
    }
  };

  return (
    <div className="admin-page">
      <Header />
      <div className="painel-wrapper">
        {/* SEÇÃO ADMINISTRADORES */}
        <section className="painel-section">
          <h2 className="painel-title">GERENCIAMENTO DE ADMINISTRADORES</h2>
          <table className="painel-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Status</th>
                <th>Função</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.cpf}>
                  <td>{user.nome}</td>
                  <td>{user.cpf}</td>
                  <td>{user.tipoUsuario}</td>
                  <td>
                    <select
                      className="select-funcao"
                      value={changedFunction[user.cpf] || user.tipoUsuario}
                      onChange={(e) =>
                        setChangedFunctions({
                          ...changedFunction,
                          [user.cpf]: e.target.value,
                        })
                      }
                    >
                      <option value="PARTICIPANT">Participante</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn-salvar"
                      onClick={() => handleSaveNewUserFunction(user)}
                      disabled={loading}
                    >
                      Salvar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* SEÇÃO EVENTOS */}
        <section className="painel-section">
          <h2 className="painel-title">ADMINISTRAÇÃO DE EVENTOS</h2>
          <table className="painel-table mb-4">
            <thead>
              <tr>
                <th>Evento</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {events.map((evt) => (
                <tr key={evt.idEvento}>
                  <td>{evt.nomeEvento}</td>
                  <td>{evt.dataEvento}</td>
                  <td>{evt.horario}</td>
                  <td>
                    <button
                      className="btn-remover"
                      onClick={() => handleDeleteEvent(evt.idEvento)}
                    >
                      Apagar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="btn-outline-cyan mt-2 mb-3"
            onClick={() => setShowEventForm(!showEventForm)}
          >
            {showEventForm ? "Fechar Formulário" : "Criar um Novo Evento"}
          </button>

          {showEventForm && (
            <div className="event-form-container animation-fade-in">
              <input
                type="text"
                placeholder="Título do Evento"
                className="full-width mb-3"
                value={newEvent.nomeEvento}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, nomeEvento: e.target.value })
                }
              />

              <div className="event-description-grid mb-3">
                <textarea
                  placeholder="Descrição"
                  value={newEvent.descricao}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, descricao: e.target.value })
                  }
                ></textarea>
                <input
                  type="date"
                  value={newEvent.dataEvento}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, dataEvento: e.target.value })
                  }
                />
              </div>

              <div className="event-description-grid mb-3">
                <input
                  type="time"
                  value={newEvent.horario}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, horario: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Local"
                  value={newEvent.lugar}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, lugar: e.target.value })
                  }
                />
              </div>

              <div className="tags-group">
                <label>Tipo do Evento</label>
                <div className="tags-buttons">
                  <button
                    className={`tag-btn ${newEvent.tipoEvento === "COMPETICAO" ? "active" : ""}`}
                    onClick={() =>
                      setNewEvent({ ...newEvent, tipoEvento: "COMPETICAO" })
                    }
                  >
                    Competição
                  </button>
                  <button
                    className={`tag-btn ${newEvent.tipoEvento === "PALESTRA" ? "active" : ""}`}
                    onClick={() =>
                      setNewEvent({ ...newEvent, tipoEvento: "PALESTRA" })
                    }
                  >
                    Palestra
                  </button>
                </div>
              </div>

              <button
                className="btn-outline-cyan mt-3"
                onClick={handleSaveEvent}
                disabled={loading}
              >
                {loading ? "Salvando..." : "Adicionar Evento"}
              </button>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
}

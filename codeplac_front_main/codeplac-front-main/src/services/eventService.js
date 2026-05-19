const baseUrl = "https://codeplac-vh95.onrender.com";

// 1. Listar todos os eventos
export const getAllEvents = async () => {
  const response = await fetch(`${baseUrl}/event/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) throw new Error("Falha ao buscar eventos");
  return response.json();
};

// 2. Criar um novo evento
export const createEvent = async (eventData, token) => {
  const response = await fetch(`${baseUrl}/event/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Token do Admin para segurança
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Falha ao criar evento");
  }
  return response.json();
};

// 3. Deletar um evento pelo ID
export const deleteEvent = async (id, token) => {
  const response = await fetch(`${baseUrl}/event/destroy/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // Token do Admin para segurança
    },
  });

  if (!response.ok) {
    throw new Error("Falha ao deletar evento");
  }
  return true;
};

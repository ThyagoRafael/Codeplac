const baseUrl = "https://codeplac-vh95.onrender.com";

export const getAllEvents = async () => {
  const response = await fetch(`${baseUrl}/event/list`);
  if (!response.ok) throw new Error("Falha ao buscar eventos");
  return response.json();
};

export const createEvent = async (eventData, token) => {
  const response = await fetch(`${baseUrl}/event/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // Token do Admin para segurança
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Falha ao criar evento");
  }
  return response.json();
};

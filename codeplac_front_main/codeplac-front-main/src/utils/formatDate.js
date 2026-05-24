import { capitalize } from "./capitalize";

export function formatDate(dateString) {
  const [ano, mes, dia] = dateString.split("-");

  const date = new Date(ano, mes - 1, dia);

  const weekdays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  const months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const weekday = weekdays[date.getDay()];
  const dayNumber = date.getDate();
  const month = months[date.getMonth()];

  return capitalize(`${weekday} - ${dayNumber} de ${month}`);
}

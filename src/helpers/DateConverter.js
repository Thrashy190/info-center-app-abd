const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

//unix to dd month yyyy
export const convertUnixToCompleteDate = (uDate) => {
  const d = new Date(uDate * 1000);
  const day = d.getDate();
  let month = d.getMonth();
  month = months[month];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};

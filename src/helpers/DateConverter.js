const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

//unix to dd month yyyy
export const convertUnixToCompleteDate = (uDate) => {
  const d = new Date(uDate * 1000);
  const day = d.getDate();
  let month = d.getMonth();
  month = months[month];
  const year = d.getFullYear();
  const hour = d.getHours();
  const minute = d.getMinutes();
  return `${day} ${month} ${year} ${hour}:${minute}`;
};

//unix to dd month yyyy
export const convertDateToUnix = (value) => {
  const d = new Date(
    value.get('year'),
    value.get('month'),
    value.get('date'),
    23,
    59,
    59,
    999
  );
  return Math.floor(d / 1000);
};

export const getTodayDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  return today;
};

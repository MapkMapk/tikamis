export default function HHMMtoMinutes(value) {
  if (typeof value !== 'string') {
    console.error('Ошибка: значение не является строкой');
    return '10:00'; 
  }
  let time = value.split(':');
  let hoursPart = Number(time[0]) * 60;
  let minutesPart = Number(time[1]);
  return hoursPart + minutesPart;
}
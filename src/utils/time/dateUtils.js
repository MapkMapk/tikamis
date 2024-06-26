/**
 * Конвертирует минуты в формат времени (часы:минуты).
 * @param {number} minutes - Количество минут.
 * @returns {string} Время в формате "HH:MM".
 */
export function convertMinutesToTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = mins.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}`;
}

export function minutesToHHMM(value) {
  return convertMinutesToTime(value);
}
/**
 * Конвертирует время в минуты.
 * @param {string} time - Время в формате "HH:MM".
 * @returns {number} Количество минут.
 */
export function convertTimeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}
export function HHMMtoMinutes(value) {
  return convertTimeToMinutes(value);
}

export function unixToShortDate(unixTime) {
  const date = new Date(unixTime * 1000);
  
  const day = date.getUTCDate();  // getUTCDate возвращает день месяца от 1 до 31
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];
  const month = months[date.getUTCMonth()];  // getUTCMonth возвращает месяц от 0 до 11

  return `${day} ${month}`;
}

/**
 * Конвертирует Unix время в форматированную дату.
 * @param {number} unixTime - Unix время.
 * @returns {string} Дата в формате "dd.MM.yyyy HH:mm".
 */
export function unixToDate(unixTime) {
  const date = new Date(unixTime * 1000);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

/**
 * Конвертирует строковую дату в Unix время.
 * @param {string} inputDate - Дата в формате "dd.MM.yyyy HH:mm".
 * @returns {number} Unix время.
 */
export function stringDateToUnix(inputDate) {
  const parts = inputDate.split(/[\s.-:]+/);
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  const hours = parseInt(parts[3], 10);
  const minutes = parseInt(parts[4], 10);

  const date = new Date(Date.UTC(year, month, day, hours, minutes));
  
  return Math.floor(date.getTime() / 1000);
}

/**
 * Конвертирует объект Date в Unix время.
 * @param {Date} inputDate - Объект Date.
 * @returns {number} Unix время.
 */
export function dateToUnix(inputDate) {
  return Math.floor(inputDate.getTime() / 1000);
}

/**
 * Конвертирует Unix время в форматированную дату с периодом.
 * @param {number} unixTime - Unix время.
 * @param {boolean} showTime - Показывать ли время.
 * @param {string} period - Период ("day", "week", "month", "year").
 * @returns {string} Форматированная дата периода.
 */
export function unixToDatePeriod(unixTime, showTime = true, period = null) {
  const date = new Date(unixTime * 1000);
  const formatDate = (d) => {
    const day = String(d.getUTCDate()).padStart(2, '0');
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const year = d.getUTCFullYear();
    const hours = String(d.getUTCHours()).padStart(2, '0');
    const minutes = String(d.getUTCMinutes()).padStart(2, '0');
    
    return showTime ? `${day}.${month}.${year} ${hours}:${minutes}` : `${day}.${month}.${year}`;
  };

  if (period === null) {
    return formatDate(date);
  } else {
    const endDate = new Date(date);
    
    switch (period) {
      case 'week':
        endDate.setUTCDate(date.getUTCDate() + 7);
        break;
      case 'month':
        endDate.setUTCMonth(date.getUTCMonth() + 1);
        break;
      case 'year':
        endDate.setUTCFullYear(date.getUTCFullYear() + 1);
        break;
      case 'day':
      default:
        endDate.setUTCDate(date.getUTCDate() + 1);
        break;
    }

    const formattedStartDate = formatDate(date);
    const formattedEndDate = formatDate(endDate);

    return `${formattedStartDate} - ${formattedEndDate}`;
  }
}

/**
 * Конвертирует Unix время в форматированную дату с периодом без времени.
 * @param {number} unixTime - Unix время.
 * @param {string} period - Период ("day", "week", "month", "year").
 * @returns {string} Форматированная дата периода.
 */
export function unixToDatePeriodHeader(unixTime, period = null) {
  const date = new Date(unixTime * 1000);
  const formatDate = (d) => {
    const day = String(d.getUTCDate()).padStart(2, '0');
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const year = d.getUTCFullYear();
    
    return `${day}.${month}.${year}`;
  };

  if (period === null) {
    return formatDate(date);
  } else {
    const endDate = new Date(date);
    
    switch (period) {
      case 'week':
        endDate.setUTCDate(date.getUTCDate() + 7);
        break;
      case 'month':
        endDate.setUTCMonth(date.getUTCMonth() + 1);
        break;
      case 'year':
        endDate.setUTCFullYear(date.getUTCFullYear() + 1);
        break;
      case 'day':
      default:
        endDate.setUTCDate(date.getUTCDate() + 1);
        break;
    }

    const formattedStartDate = formatDate(date);
    const formattedEndDate = formatDate(endDate);

    return `${formattedStartDate} - ${formattedEndDate}`;
  }
}

/**
 * Возвращает Unix время полночь сегодняшнего дня.
 * @returns {number} Unix время.
 */
export function getUnixToday() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Устанавливаем время на полночь (00:00:00) по UTC
  console.log(`getUnixToday: ${today.getTime() / 1000}`)
  return Math.floor(today.getTime() / 1000); // Возвращаем Unix время
}
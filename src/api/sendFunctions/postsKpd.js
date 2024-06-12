function formatDeviationMinutes(minutes) {
  if (minutes != null) {
    if (minutes > 0) {
      return '+' + minutes.toString();
    } else {
      return minutes.toString();
    }
  } else {
    return '';
  }
}
export function processData(headersArray, dataArray, sort) {
  const keyName = sort === 'itemsByPosts' ? 'postNumber' : 'mechanicName';
  let result = [];

  // Добавление заголовков в выходной JSON
  result.push(headersArray.map(header => header.header));

  // Обработка данных
  dataArray.forEach(item => {
    const key = item[keyName] != null ? item[keyName] : '';
    const total = formatDeviationMinutes(item.totalDeviationMinutes);

    // Добавление основной информации
    result.push([key, "Все работы", total]);

    // Добавление информации о каждой работе
    item.works.forEach(work => {
      const workName = work.workName || '';
      const loss = formatDeviationMinutes(work.deviationMinutes);
      result.push([null, workName, loss]);
    });
  });

  return result;
}
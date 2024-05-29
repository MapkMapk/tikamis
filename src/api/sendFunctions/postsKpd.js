export function processData(headersArray, dataArray, sort) {
    const keyName = sort === 'itemsByPosts' ? 'postNumber' : 'mechanicName';
    // Обработка массивов для формирования выходного JSON
    let result = [];
  
    // Добавляем заголовки в выходной JSON
    result.push(headersArray.map(header => header.header));
  
    // Обрабатываем данные
    dataArray.forEach(item => {
      // Проверяем, что все нужные поля определены
      const key = item[keyName] != null ? item[keyName] : '';
      const total = item.totalDeviationMinutes != null ? item.totalDeviationMinutes.toString() : '';
  
      // Добавляем основную информацию
      result.push([key, "Все работы", total]);
  
      // Добавляем информацию о каждой работе
      item.works.forEach(work => {
        const workName = work.workName || '';
        const loss = work.deviationMinutes != null ? work.deviationMinutes.toString() : '';
        result.push([null, workName, loss]);
      });
    });
  
    return result;
  }

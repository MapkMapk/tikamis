import { formatTotalDowntime, unixToData } from '@/utils/Things.js'; 
export function processData(dataArray, sort) {
    const keyName = sort === 'itemsByPosts' ? 'postNumber' : 'mechanicName';
    // Получаем заголовки в зависимости от сортировки
    const headersArray = sort === 'itemsByPosts' ? [
      { header: 'Пост' },
      { header: 'Все работы' },
      { header: 'Простой' }
    ] : [
      { header: 'Механик' },
      { header: 'Все работы' },
      { header: 'Простой' }
    ];
  
    let result = [];
  
    // Добавляем заголовки в выходной JSON
    result.push(headersArray.map(header => header.header));
  
    // Обрабатываем данные
    dataArray.forEach(item => {
      // Проверяем, что все нужные поля определены
      const key = item[keyName] || '';
      const total = item.totalDowntime != null ? item.totalDowntime.toString() : '';
  
      // Добавляем основную информацию
      result.push([key, 'Все простои', total]);
  
      // Добавляем информацию о каждом простое
      item.downtimes.forEach(downtime => {
        const formattedDate = unixToData(downtime.unixTime);
        const downtimeMinutes = formatTotalDowntime(downtime.downtimeMinutes);
        result.push([null, formattedDate, downtimeMinutes]);
      });
    });
  
    // Добавляем итоговую строку
    const totalDowntime = dataArray.reduce((acc, item) => acc + (item.totalDowntime || 0), 0);
    result.push(['Итого простоя:', formatTotalDowntime(totalDowntime), null]);
  
    return result;
  }
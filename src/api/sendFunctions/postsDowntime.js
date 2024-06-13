import { unixToDate } from '@/utils/time/dateUtils.js';

export function convertToDowntimeTableFormat(tabularTitle, tableHeaders, data, filter) {
  const result = [];
  const headerArray = tableHeaders.map(column => column.header);
  result.push(headerArray); // tableHeaders это массив

  if (filter === 'itemsByPosts') {
    // Заголовок таблицы для постов

    data.forEach(post => {
      // Добавляем строку с общими данными по посту
      result.push([post.postNumber, post.totalDowntime, "Все простои"]);

      post.downtimes.forEach(downtime => {
        // Добавляем строки с данными по каждому времени простоя
        result.push([null, downtime.downtimeMinutes, unixToDate(downtime.unixTime)]);
      });
    });
  } else {
    // Заголовок таблицы для механиков

    data.forEach(mechanic => {
      // Добавляем строку с общими данными по механику
      result.push([mechanic.mechanicName, mechanic.totalDowntime, "Все простои"]);

      mechanic.downtimes.forEach(downtime => {
        // Добавляем строки с данными по каждому времени простоя
        result.push([null, downtime.downtimeMinutes, unixToDate(downtime.unixTime)]);
      });
    });
  }

  return {
    title: tabularTitle,
    content: result
  };
}
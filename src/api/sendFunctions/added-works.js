export function convertToTableFormat(tabularTitle, tableHeaders, data, filter) {
    const result = [];
    const headerArray = tableHeaders.map(column => column.header);
    result.push(headerArray); // tableHeaders это массив
  
    if (filter === 'itemsByPosts') {
      // Заголовок таблицы для постов
  
      data.forEach(post => {
        // Добавляем строку с общими данными по посту
        result.push([post.postNumber, "Все работы", post.totalProfit]);
  
        post.works.forEach(work => {
          // Добавляем строки с данными по каждой работе
          result.push([null, work.workName, work.profit]);
        });
      });
    } else {
      // Заголовок таблицы для механиков
  
      data.forEach(mechanic => {
        // Добавляем строку с общими данными по механику
        result.push([mechanic.mechanicName, "Все работы", mechanic.totalProfit]);
  
        mechanic.works.forEach(work => {
          // Добавляем строки с данными по каждой работе
          result.push([null, work.workName, work.profit]);
        });
      });
    }
  
    return {
      title: tabularTitle,
      content: result
    };
  }
  
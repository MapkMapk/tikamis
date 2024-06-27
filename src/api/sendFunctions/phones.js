export function convertToPhoneCarTableFormat(tabularTitle, data) {
    const tableHeaders = ["Телефон", "Автомобиль"];
    const result = [];
    result.push(tableHeaders); // Добавляем заголовки таблицы
  
    data.forEach(item => {
      // Создаем строки для каждого телефона и автомобиля
      item.phones.forEach(phone => {
        item.plates.forEach(plate => {
          result.push([phone, plate]);
        });
      });
    });
  
    return {
      title: tabularTitle,
      content: result
    };
  }
  
import { ref } from 'vue';

export async function fetchCustomerData(apiClient, url, carCenterIds, { date, period, workId, additionalData = {} } = {}) {
  // Логирование всех переменных
  console.log('apiClient:', apiClient);
  console.log('url:', url);
  console.log('carCenterIds:', carCenterIds);
  console.log('date:', date);
  console.log('period:', period);
  console.log('workId:', workId);
  console.log('additionalData:', additionalData);

  // Убедитесь, что параметры деструктурируются корректно
  if (!date || !period) {
    console.error('Missing parameters:', { date, period, workId, additionalData });
    throw new Error('Missing required parameters: date or period');
  }

  const filters = {
    interval: period,
    dateStart: date,
    works: Array.isArray(workId) ? workId : workId ? [workId] : null,
    carCenters: carCenterIds.value, // Всегда включаем для sadmin, иначе может быть пустым
    page: 1, // Можно поменять при необходимости
  };

  // Удаляем неиспользуемые фильтры
  if (!filters.dateStart) delete filters.dateStart;
  if (!filters.works) delete filters.works;
  if (!filters.carCenters) delete filters.carCenters;

  try {
    const response = await apiClient.post(url, {
      filters,
      ...additionalData // Добавляем дополнительные данные к запросу
    });
    
    console.log('response:', response.data);

    const data = response.data;
    return data;
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    throw error;
  }
}
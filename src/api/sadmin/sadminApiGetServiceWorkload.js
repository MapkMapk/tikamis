import { sadminApiClient } from '@/api/sadminApiClient.js';

export default async function (request) {  
  try {
    let { data } = await sadminApiClient.post('/analytics/get-workloads', request);
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных о загруженности сервиса:", error);
    throw error; // Перебрасываем ошибку дальше
  }
}


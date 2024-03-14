import { directorApiClient } from '@/api/directorApiClient.js';


export default async function (request) {  
  try {
    let { data } = await directorApiClient.post('/report/get-canceled-works', request);
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных о загруженности сервиса:", error);
    throw error; // Перебрасываем ошибку дальше
  }
}


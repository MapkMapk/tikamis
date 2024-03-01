import { directorApiClient } from '@/api/directorApiClient.js';

export default async function () {
    let filters = {
      "filters": {
        "interval": "year",
        "dateStart": 1672544807,
        "works": [
          "11111",
          "22222",
          "33333",
          "44444",
          "55555"
        ],
        "page": 1
      }
    };
    let { data } = await directorApiClient.post('/analytics/get-posts-KPD', filters);
    return data;
}
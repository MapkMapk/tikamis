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
        "carCenters": [
            "C-1111"
        ],
        "page": 1
      }
    };
    let { data } = await directorApiClient.post('/manage/get-shift-calendar', filters);
    return data;
}
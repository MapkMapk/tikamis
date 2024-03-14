import { directorApiClient } from '@/api/directorApiClient.js';

export default async function directorApiReports(url, filters) {
    try {
        const { data } = await directorApiClient.post(url, filters);
        return data;
      } catch (error) {
        throw new Error(`Failed to fetch data from ${url}: ` + error.message);
      }
    }
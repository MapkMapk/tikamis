import { sadminApiClient } from '@/api/sadminApiClient.js';

export default async function (url, filters) {
    try {
        const { data } = await sadminApiClient.post(url, filters);
        return data;
    } catch (error) {
        throw new Error('Failed to fetch data: ' + error.message);
    }
}
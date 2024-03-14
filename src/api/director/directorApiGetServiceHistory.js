import { directorApiClient } from '@/api/directorApiClient.js';

export default async function (filters) {
    try {
        const { data } = await directorApiClient.post('/analytics/get-order-history', { filters });
        return data;
    } catch (error) {
        throw new Error('Failed to fetch customer records: ' + error.message);
    }
}
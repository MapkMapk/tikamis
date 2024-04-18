import { sadminApiClient } from '@/api/sadminApiClient.js';

export default async function (filters) {
    try {
        const { data } = await sadminApiClient.post('/analytics/get-order-history', { filters });
        return data;
    } catch (error) {
        throw new Error('Failed to fetch customer records: ' + error.message);
    }
}
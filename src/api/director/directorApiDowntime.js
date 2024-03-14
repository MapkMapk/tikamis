import { directorApiClient } from '@/api/directorApiClient.js';

export default async function (filters) {
    try {
        let { data } = await directorApiClient.post('/report/get-posts-downtime',filters);
        return data;
    } catch (error) {
        throw new Error('Failed to fetch customer records: ' + error.message);
    }
}
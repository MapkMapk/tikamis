import { directorApiClient } from '@/api/directorApiClient.js';

export default async function (orderId) {
    try {
        const response = await directorApiClient.delete('/manage/order', {
            data: { orderId } 
        });
        return response.data; 
    } catch (error) {
        throw new Error('Failed to delete customer record: ' + error.message);
    }
}
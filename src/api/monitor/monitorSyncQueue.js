import { monitorApiClient } from '@/api/monitorApiClient';

export async function fetchServiceInfo(carCenterId) {
    try {
      const response = await monitorApiClient.post('/sync-queue', {
        car_center_id: carCenterId,
      });
      if (response.data.status === 'ok') {
        return response.data.content;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Failed to fetch service info:', error);
      throw error;
    }
  }
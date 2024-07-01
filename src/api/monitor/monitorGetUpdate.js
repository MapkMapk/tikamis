import { monitorApiClient } from '@/api/monitorApiClient';

export async function fetchQueueUpdate(carCenterId, queueIndex) {
  try {
    const response = await monitorApiClient.post('/get-update', {
      car_center_id: carCenterId,
      queue_index: queueIndex,
    });

    if (response.status === 200) {
      if (response.data.status === 'ok') {
        return response.data.content;
      } else if (response.data.status === 'error' && response.data.message === 'CarCenterNotFound') {
        throw new Error('CarCenterNotFound');
      } else {
        throw new Error(response.data.message || 'Failed to fetch queue update');
      }
    } else if (response.status === 204) {
      return null; // No updates
    } else {
      throw new Error(response.data.message || 'Failed to fetch queue update');
    }
  } catch (error) {
    console.error('Failed to fetch queue update:', error);
    throw error;
  }
}
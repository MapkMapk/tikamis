import { ref } from 'vue';
import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';
import isEnv from '@/utils/isEnv.js';
import { getUnixToday } from '@/utils/time/dateUtils.js';

export function useFilters(emit) {
  const serviceStationsStore = useSadminServiceStationsStore();
  
  const selectedCarCenterIds = ref(
    isEnv('sadmin') ? [serviceStationsStore?.getSelectedServiceStation().id] : 'none'
  );

  const currentSelectedDate = ref(getUnixToday());
  const currentSelectedPeriod = ref('month');
  const currentSelectedSort = ref('itemsByPosts');
  const currentSelectedWorkId = ref('');

  const emitFiltersUpdate = () => {
    const data = {
      dateStart: currentSelectedDate.value,
      period: currentSelectedPeriod.value,
      sort: currentSelectedSort.value,
      workId: currentSelectedWorkId.value
    };
    emit('updateFilters', data);
  };

  const fetchCustomerSkipsData = async (filters, apiClient) => {
    try {
      const response = await apiClient.post('/report/get-posts-downtime', { filters });
      return response.data;
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      throw error;
    }
  };

  const resetFiltersToDefault = () => {
    currentSelectedDate.value = getUnixToday();
    currentSelectedPeriod.value = 'month';
    currentSelectedSort.value = 'itemsByPosts';
    currentSelectedWorkId.value = null;
    emitFiltersUpdate();
  };

  return {
    currentSelectedDate,
    currentSelectedPeriod,
    currentSelectedSort,
    currentSelectedWorkId,
    selectedCarCenterIds,
    emitFiltersUpdate,
    fetchCustomerSkipsData,
    resetFiltersToDefault
  };
}
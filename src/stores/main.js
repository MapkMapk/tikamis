import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { sadminApiClient } from '@/api/sadminApiClient.js';
import { directorApiClient } from '@/api/directorApiClient.js';
import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';
import isEnv from '@/utils/isEnv.js';
import { getUnixToday } from '@/utils/time/dateUtils.js';
export const useStore = defineStore('main', () => {
  const isHeaderMenuOpen = ref(false);

  const carCenterId = computed(() => {
    return isEnv('sadmin') 
      ? [useSadminServiceStationsStore()?.getSelectedServiceStation().id]
      : null;
  });

  const mainDateUnix = ref(getUnixToday()); // Устанавливаем mainDateUnix равным сегодняшнему дню в Unix времени

  const mainDate = computed(() => new Date(mainDateUnix.value * 1000)); // Вычисляем mainDate из mainDateUnix

  const mainPeriod = 'month';
  const mainSort = 'itemsByMechanics';
  const mainPage = 1;
  const mainStep = 'day';

  async function workList() {
    let data;
    if (isEnv('sadmin')) {
      const response = await sadminApiClient.get('/all-works');
      data = response.data.works;
    } else {
      const response = await directorApiClient.get('/all-works');
      data = response.data.works;
    }
    return data;
  }

  

  return { 
    isHeaderMenuOpen, 
    mainDateUnix, 
    mainDate, 
    mainPeriod, 
    mainSort, 
    mainPage, 
    mainStep, 
    carCenterId, 
    workList
  };
});
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { sadminApiClient } from '@/api/sadminApiClient.js';
import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';

export const useSadminStore = defineStore('main', () => {
  let isHeaderMenuOpen = ref(false);

  const carCenterId = computed(() => {
    return useSadminServiceStationsStore()?.getSelectedServiceStation().id
  });

  const mainDate = 1675882800;
  const mainPeriod ='month';
  const mainSort = 'itemsByMechanics'
  const mainPage = 1;
  const mainStep = 'day';
  
  function $reset() {
    isHeaderMenuOpen.value = false;
  }
  async function workList() {
    const { data } = await sadminApiClient.get('/all-works');
    return data;
  }
  

  return { isHeaderMenuOpen, mainDate, mainPeriod, mainSort, mainPage, mainStep, carCenterId, $reset, workList };
});

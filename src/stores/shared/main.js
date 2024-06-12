import { defineStore } from 'pinia';
import { ref } from 'vue';
import { directorApiClient } from '@/api/directorApiClient.js';

export const useMainStore = defineStore('main', () => {
  let isHeaderMenuOpen = ref(false);

  function $reset() {
    isHeaderMenuOpen.value = false;
  }
  const mainDate = 1675882800;
  const mainPeriod ='month';
  const mainSort = 'itemsByMechanics'
  const mainPage = 1;
  const mainStep = 'day';
  
  async function workList() {
    const { data } = await directorApiClient.get('/all-works');
    return data;
  }
  return { isHeaderMenuOpen, mainDate, mainStep, mainPage, mainPeriod, mainSort, $reset, workList };
});

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { directorApiClient } from '@/api/directorApiClient.js';

export const useMainStore = defineStore('main', () => {
  let isHeaderMenuOpen = ref(false);

  function $reset() {
    isHeaderMenuOpen.value = false;
  }
  async function workList() {
    const { data } = await directorApiClient.get('/all-works');
    return data;
  }
  return { isHeaderMenuOpen, $reset, workList };
});

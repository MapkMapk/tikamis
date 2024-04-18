import { defineStore } from 'pinia';
import { ref } from 'vue';
import { sadminApiClient } from '@/api/sadminApiClient.js';

export const useSadminStore = defineStore('main', () => {
  let isHeaderMenuOpen = ref(false);

  function $reset() {
    isHeaderMenuOpen.value = false;
  }
  async function workList() {
    const { data } = await sadminApiClient.get('/all-works');
    return data;
  }
  return { isHeaderMenuOpen, $reset, workList };
});

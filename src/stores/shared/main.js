import { defineStore } from 'pinia';
import { ref } from 'vue'

export const useMainStore = defineStore('main', () => {
  let isHeaderMenuOpen = ref(false);

  return { isHeaderMenuOpen };
});

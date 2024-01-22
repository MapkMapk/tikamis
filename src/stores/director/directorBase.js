import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDirectorBaseStore = defineStore(
  'directorBase',
  () => {
    let isMenuActive = ref(false)

    return { isMenuActive };
  },
  {
    persist: true
  }
);
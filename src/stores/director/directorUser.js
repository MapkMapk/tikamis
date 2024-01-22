import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDirectorUserStore = defineStore(
  'directorUser',
  () => {
    let accessToken = ref('');
    let refreshToken = ref('');

    return { accessToken, refreshToken };
  },
  {
    persist: true
  }
);
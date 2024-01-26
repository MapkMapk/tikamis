import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSadminUserStore = defineStore(
  'sadminUser',
  () => {
    let accessToken = ref('');
    let refreshToken = ref('');

    return { accessToken, refreshToken };
  },
  {
    persist: true
  }
);
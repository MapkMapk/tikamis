import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMechanicUserStore = defineStore('order', () => {
  let accessToken = ref('');
  let refreshToken = ref('');

  return {accessToken, refreshToken}
})
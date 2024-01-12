import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMechanicUserStore = defineStore('mechanicUser', () => {
  let accessToken = ref('');
  let refreshToken = ref('');

  return {accessToken, refreshToken}
})
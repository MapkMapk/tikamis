import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMechanicUserStore = defineStore('mechanicUser', () => {

  let currentMechanic = ref({
    id: '',
    name: ''
  })

  function addTokens(accessToken, refreshToken) {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
  }

  return { addTokens, currentMechanic }
},{
  persist: true,
})
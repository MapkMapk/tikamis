import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMechanicUserStore = defineStore(
  'mechanicUser',
  () => {
    let activeMechanicId = ref('')
    let activeMechanicName = ref('')

    function addTokens(accessToken, refreshToken) {
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
    }

    return { addTokens, activeMechanicId, activeMechanicName }
  },
  {
    persist: true
  }
)

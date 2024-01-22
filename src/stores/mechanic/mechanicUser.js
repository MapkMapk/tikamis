import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMechanicUserStore = defineStore(
  'mechanicUser',
  () => {
    let activeMechanicId = ref('');
    let activeMechanicName = ref('');
    let accessToken = ref('');
    let refreshToken = ref('');

    return { activeMechanicId, activeMechanicName, accessToken, refreshToken };
  },
  {
    persist: true
  }
);

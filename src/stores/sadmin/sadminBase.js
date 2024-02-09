import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSadminBaseStore = defineStore(
  'sadminBase',
  () => {
    let amountOfSelectedServices = ref();

    function $reset() {}

    return { amountOfSelectedServices };
  },
  {
    persist: true
  }
);
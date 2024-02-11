import { defineStore } from 'pinia';
import { ref } from 'vue'

export const useSadminBaseStore = defineStore(
  'sadminBase',
  () => {
    let serviceStations = ref([]);

    function getAmountOfSelectedServiceStations() {
      let counter = 0;
      serviceStations.value.forEach((station) => {
        if (station.isSelected) {counter++}
      })
      return counter
    }

    function $reset() {}

    return { serviceStations, getAmountOfSelectedServiceStations };
  },
  {
    persist: true
  }
);
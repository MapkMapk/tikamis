import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSadminServiceStationsStore = defineStore(
  'sadminServiceStations',
  () => {
    let serviceStations = ref([]);

    function $reset() {
      serviceStations.value = [];
    }

    function getSelectedServiceStations() {
      return serviceStations.value.filter(station => station.isSelected);
    }
    function getSelectedServiceStationIds() {
      return serviceStations.value
        .filter(station => station.isSelected) // Фильтруем только выбранные сервисы
        .map(station => station.id); // Преобразуем каждый объект в его идентификатор
    }
    function getSelectedServiceStationsCount() {
      return getSelectedServiceStations().length;
    }
    function setNewSelectedServiceStations(selectedServiceStations) {
      serviceStations.value.forEach(station => {
        station.isSelected = false;
      });
      selectedServiceStations.forEach(selectedStation => {
        const station = serviceStations.value.find(station => station.id === selectedStation.id);
        if (station) {
          station.isSelected = true;
        }
      });
    }

    return { serviceStations, getSelectedServiceStations, getSelectedServiceStationsCount, setNewSelectedServiceStations, getSelectedServiceStationIds, $reset };
  },
  {
    persist: true
  }
);
<template>
    <div class="flex flex-col items-center mx-[3vh]">
      <h1 class="mb-[1.5%] mt-[0.5%]">Выбор автосервиса</h1>
      <ul class="flex flex-col items-center w-full">
        <li v-for="service in carCenters" :key="service.id" class="w-full">
          <router-link :to="`/monitor/service?id=${service.id}`">{{ service.name }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { monitorApiClient } from '@/api/monitorApiClient';
  const carCenters = ref([]);
  
  async function fetchCarCenters() {
    try {
      const response = await monitorApiClient.get('/car-centers');
      carCenters.value = response.data.items;
    } catch (error) {
      console.error('Failed to fetch car centers:', error);
    }
  }
  
  onMounted(fetchCarCenters);
  </script>
  
  <style scoped>
h1{
    font-family: Inter;
font-size: 50px;
font-weight: 600;
line-height: 60.51px;
text-align: center;
}
li{
    font-family: Inter;
font-size: 36px;
font-weight: 500;
line-height: 43.57px;
text-align: center;
}
li:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.1); /* Черный цвет с прозрачностью 10% для нечетных элементов */
}
  </style>
<template>
  <div>
    
    <MainHeader />
    <MainHeaderGap />

    <TabularSection>
      <TabularPrimeTitle class="mb-2">Кпд сервиса</TabularPrimeTitle>
      <TabularFiltersWrapper>
      <TabularFilterPeriod :option-selected="handleOptionSelected" style="flex: 184;"/>
      <TabularFilterDate @updateDate="handleSelectedDateFirst" style="flex: 307;"/>
      <TabularFilterDateCleared @updateDate="handleSelectedDateSecond" :clear-start-date="true" style="flex: 307;"/>

      <TabularButtonApplyFilters style="flex: 217;" @click="fetchCustomerSkipsData" />
      <TabularButtonCross style="flex: 60; cursor: pointer;" @click="defaultFilters" />
    </TabularFiltersWrapper>
    </TabularSection>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';
import directorApiGetCustomerRecords from '@/api/director/directorApiGetCustomerRecords.js';

import TabularSection from '@/components/Tabular/TabularSection.vue';
import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
import TabularFiltersWrapper from '@/components/Tabular/TabularFiltersWrapper.vue';
import TabularFilterPeriod from '@/components/Tabular/TabularFilterPeriod.vue';
import TabularFilterDate from '@/components/Tabular/TabularFilterDate.vue';
import TabularFilterDateCleared from '@/components/Tabular/TabularFilterDateCleared.vue';

import '@vuepic/vue-datepicker/dist/main.css';


import TabularButtonCross from '@/components/Tabular/TabularButtonCross.vue';
import TabularButtonApplyFilters from '@/components/Tabular/TabularButtonApplyFilters.vue';
import { directorApiClient } from '@/api/directorApiClient';







</script>

<script>
const DateFirst = ref(1675796400);
const DateSecond = ref();
function handleSelectedDateFirst(date){
  DateFirst.value = date;
}
function handleSelectedDateSecond(date){
  DateSecond.value = date;
}

async function fetchCustomerSkipsData() {
  const filtersF = {
    filters: {
    interval: 'month',
    dateStart: DateFirst.value,
    works: null,
    carCenters: ['C-1111'], // Указаны для примера, измените по необходимости
    page: 1 // Указано для примера, измените по необходимости
    },
    step: 'day'
  };
  const filtersS = {
    filters: {
    interval: 'month',
    dateStart: DateSecond.value,
    works: null,
    carCenters: ['C-1111'], // Указаны для примера, измените по необходимости
    page: 1 // Указано для примера, измените по необходимости
    },
    step: 'day'
  };

  try {
    const response = await directorApiClient.post('/analytics/get-center-KPD', filtersF);
    console.log(response);

    if (DateSecond.value !== null) {
      const responseSec = await directorApiClient.post('/analytics/get-center-KPD', filtersS);
       console.log(responseSec);
    }

  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
}


</script>

<style scoped>
.custom-details summary {
  list-style: none;
}

.custom-details summary::-webkit-details-marker {
  display: none;
}

.custom-details  {
  margin-right: 50px;
}

.custom-details[open] summary:after {
  transform: rotate(-90deg);
}
.report-table-row:nth-child(odd) {
  background-color: #f5f5f5;
}
</style>

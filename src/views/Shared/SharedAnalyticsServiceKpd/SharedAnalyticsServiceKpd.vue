<template>
  <div>
    
    <MainHeader />
    <MainHeaderGap />

    <TabularSection>
      <TabularPrimeTitle class="mb-2">Кпд сервиса</TabularPrimeTitle>
      <TabularFiltersWrapper>
      <TabularFilterPeriod @updatePeriod="handleOptionSelected" style="flex: 184;"/>
      <TabularFilterDate @updateDate="handleSelectedDateFirst" style="flex: 307;"/>
      <TabularFilterDateCleared @updateDate="handleSelectedDateSecond" :clear-start-date="true" style="flex: 307;"/>

      <TabularButtonApplyFilters style="flex: 217;" @click="fetchCustomerSkipsData" />
      <TabularButtonCross style="flex: 60; cursor: pointer;" @click="defaultFilters" />
    </TabularFiltersWrapper>
    <div class="apexxcharts">
    <div id="chart1" class="apexxchart">
      <apexchart
        :key="chartKey1"
        type="bar"
        height="500"
        :options="chartOptions1"
        :series="series1">
      </apexchart>
    </div>
    <div v-if="DateSecond!=null" id="chart2" class="apexxchart">
      <apexchart
        :key="chartKey2"
        type="bar"
        height="500"
        :options="chartOptions2"
        :series="series2">
      </apexchart>
    </div>
    </div>
    </TabularSection>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect  } from 'vue';
import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';
import directorApiGetCustomerRecords from '@/api/director/directorApiGetCustomerRecords.js';

import TabularSection from '@/components/Tabular/TabularSection.vue';
import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
import TabularFiltersWrapper from '@/components/Tabular/TabularFiltersWrapper.vue';
import TabularFilterPeriod from '@/components/Tabular/TabularFilterPeriodLow.vue';
import TabularFilterDate from '@/components/Tabular/TabularFilterDate.vue';
import TabularFilterDateCleared from '@/components/Tabular/TabularFilterDateCleared.vue';

import '@vuepic/vue-datepicker/dist/main.css';
import ApexCharts from 'vue3-apexcharts';

import TabularButtonCross from '@/components/Tabular/TabularButtonCross.vue';
import TabularButtonApplyFilters from '@/components/Tabular/TabularButtonApplyFilters.vue';
//////////
//оч важный блок
//////////
import isEnv from '@/utils/isEnv.js';
import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';
import { sadminApiClient } from '@/api/sadminApiClient';
import { directorApiClient } from '@/api/directorApiClient';
import { computed } from 'vue';
const sadminServiceStationsStore = useSadminServiceStationsStore();
const apiCall = isEnv('sadmin') ? sadminApiClient : directorApiClient;

const carCenterIds = computed(() => {
      // Замените эту логику на реальный вызов функции isEnv и доступ к sadminServiceStationsStore
      return isEnv('sadmin') 
        ? sadminServiceStationsStore?.getSelectedServiceStationIds()[0]
        : "none";
    });
console.log(carCenterIds.value);
//////////
//
//////////
const filterDatePeriod = ref('day');
function handleOptionSelected(option) {filterDatePeriod.value = option; console.log(option)}
const DateFirst = ref(1675796400);
const DateSecond = ref();
function handleSelectedDateFirst(date){
  DateFirst.value = date;
}
function handleSelectedDateSecond(date){
  DateSecond.value = date;
}
const maxyaxis = ref(100);
const chartKey1 = ref(0);
const chartKey2 = ref(0);
function getDefaultChartOptions() {
  return {
    chart: {
      type: 'bar',
      height: 500,
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
      }
    },
    dataLabels: {
          enabled: false,
    },
    xaxis: {
      categories: []
    },
    yaxis: {
      max: maxyaxis.value,
      labels: {
      formatter: function(value) {
        // Округляем до двух знаков после запятой и преобразуем в строку
        return parseFloat(value.toFixed(2)).toString();
      }
    }
    }
  };
}

const chartOptions1 = ref(getDefaultChartOptions());

const series1 = ref([]);
const chartOptions2 = ref(getDefaultChartOptions());
const series2 = ref([]);

// Обработка и загрузка данных для ApexCharts
async function fetchCustomerSkipsData() {
  // Запрос к API для первого набора данных
  const data1 = await fetchDataAndProcess(DateFirst.value);
  processDataForChart(data1);

  // Проверка, нужно ли делать второй запрос
  if (DateSecond.value) {
    const data2 = await fetchDataAndProcess(DateSecond.value);
    processDataForChart(data2);
  }
}
async function fetchDataAndProcess(date, chartOptions, series) {
  //const apiUrl = 'http://127.0.0.1:5000/api/new-endpoint'; // Пример URL API
  try {
    // const response = await fetch(apiUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     filters: {
    //       interval: 'month',
    //       dateStart: date,// дата в unix
    //       works: null,
    //       carCenters: ['C-1111'], // Указаны для примера, измените по необходимости
    //       page: 1 // Указано для примера, измените по необходимости
    //       },
    //       step: filterDatePeriod.value
    //   }),
    // });
    const responseBody = {filters: {
          interval: 'month',
          dateStart: date,// дата в unix
          works: null,
          carCenters: [carCenterIds.value], // Указаны для примера, измените по необходимости
          page: 1 // Указано для примера, измените по необходимости
          },
          step: filterDatePeriod.value}
    //const response = await apiCall.post('/analytics/get-center-KPD', responseBody);
    const response = await apiCall.post('/analytics/get-center-KPD', responseBody);
    if (response.data && response.data.bars) {
      processDataForChart(response.data, chartOptions, series);
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
}
function processDataForChart(apiResponse, chartOptions, series) {
  chartKey1.value++;
  chartKey2.value++;

  chartOptions.value.xaxis.categories = apiResponse.bars.map(bar => bar.label);
  chartOptions.value.yaxis.max = Math.round(apiResponse.totalCapacity);
  // console.log(123);
  // console.log(chartOptions.value.yaxis.max);
  // console.log(123);
  series.value = [
    {
      name: "КПД, загруженность или фактическая нагрузка",
      data: apiResponse.bars.map(bar => (bar.factCapacity*bar.workloadPercents/100)),
      color: "#E31E24B3",
    },
    {
      name: "Мощность сервиса, доступность рабочих постов",
      data: apiResponse.bars.map(bar => bar.factCapacity*((100-bar.workloadPercents)/100)),
      color: "#1E84E3B3",
    },
  ];
  /*  chartOptions.value.xaxis.categories = apiResponse.bars.map(bar => bar.label);
  chartOptions.value.yaxis = {
    max: apiResponse.totalCapacity
  };
  series.value = [
    {
      name: "КПД, загруженность или фактическая нагрузка",
      data: apiResponse.bars.map(bar => Math.round(bar.factCapacity*((100-bar.workloadPercents)/100))),
      color: "#E31E24B3",
    },
    {
      name: "Мощность сервиса, доступность рабочих постов",
      data: apiResponse.bars.map(bar => Math.round(bar.factCapacity*bar.workloadPercents/100)),
      color: "#1E84E3B3",
    },
  ];
  chartKey.value++; */
}

watchEffect(() => {
  fetchDataAndProcess(DateFirst.value, chartOptions1, series1);
  if (DateSecond.value) {
    fetchDataAndProcess(DateSecond.value, chartOptions2, series2);
  }
});
onMounted(fetchCustomerSkipsData);

// async function fetchCustomerSkipsDataN() {
//   const filtersF = {
//     filters: {
//     interval: 'month',
//     dateStart: DateFirst.value,// дата в unix
//     works: null,
//     carCenters: ['C-1111'], // Указаны для примера, измените по необходимости
//     page: 1 // Указано для примера, измените по необходимости
//     },
//     step: 'day'
//   };
//   const filtersS = {
//     filters: {
//     interval: 'month',
//     dateStart: DateSecond.value,
//     works: null,
//     carCenters: ['C-1111'], // Указаны для примера, измените по необходимости
//     page: 1 // Указано для примера, измените по необходимости
//     },
//     step: 'day'
//   };
// }
</script>

<style scoped>
.custom-details summary {
  list-style: none;
}
.apexxcharts{
display: flex;
}

.apexxchart{
  width: -webkit-fill-available;
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

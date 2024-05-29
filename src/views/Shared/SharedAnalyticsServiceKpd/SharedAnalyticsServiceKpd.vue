<template>
  <div>
    
    <MainHeader />
    <MainHeaderGap />

    <TabularSection>
      <TabularPrimeTitle class="mb-2">Кпд сервиса</TabularPrimeTitle>
      <TabularFiltersWrapper>
      <TabularFilterPeriod @updatePeriod="selectOptionHandler" style="flex: 184;"/>
      <TabularFilterDate @updateDate="selectFirstDateHandler" style="flex: 307;"/>
      <TabularFilterDateCleared @updateDate="selectSecondDateHandler" :clear-start-date="true" style="flex: 307;"/>

      <TabularButtonApplyFilters style="flex: 217;" @click="fetchData" />
      <TabularButtonCross style="flex: 60; cursor: pointer;" @click="resetToDefaultFilters" />
    </TabularFiltersWrapper>
    <div class="apexxcharts">
    <div id="chart1" class="apexxchart">
      <apexchart
        :key="firstChartKey"
        type="bar"
        height="500"
        :options="firstChartOptions"
        :series="firstChartSeries">
      </apexchart>
    </div>
    <div v-if="secondDate!=null" id="chart2" class="apexxchart">
      <apexchart
        :key="secondChartKey"
        type="bar"
        height="500"
        :options="secondChartOptions"
        :series="secondChartSeries">
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
const sadminStationsStore = useSadminServiceStationsStore();
const apiClient = isEnv('sadmin') ? sadminApiClient : directorApiClient;

const carCenterIds = computed(() => {
      // Замените эту логику на реальный вызов функции isEnv и доступ к sadminStationsStore
      return isEnv('sadmin') 
        ? sadminStationsStore?.getSelectedServiceStation().id
        : "none";
    });
console.log(carCenterIds.value);
//////////
//
//////////
const filterPeriod = ref('day');
function selectOptionHandler(option) {filterPeriod.value = option; console.log(option)}
const firstDate = ref(1675796400);
const secondDate = ref();
function selectFirstDateHandler(date){
  firstDate.value = date;
}
function selectSecondDateHandler(date){
  secondDate.value = date;
}
const maxYAxis = ref(100);
const firstChartKey = ref(0);
const secondChartKey = ref(0);
function getChartDefaultOptions() {
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
      max: maxYAxis.value,
      labels: {
      formatter: function(value) {
        // Округляем до двух знаков после запятой и преобразуем в строку
        return parseFloat(value.toFixed(2)).toString();
      }
    }
    }
  };
}

const firstChartOptions = ref(getChartDefaultOptions());

const firstChartSeries = ref([]);
const secondChartOptions = ref(getChartDefaultOptions());
const secondChartSeries = ref([]);

// Обработка и загрузка данных для ApexCharts
async function fetchData() {
  // Запрос к API для первого набора данных
  const data1 = await fetchAndProcessData(firstDate.value);
  processChartData(data1);

  // Проверка, нужно ли делать второй запросs
  if (secondDate.value) {
    const data2 = await fetchAndProcessData(secondDate.value);
    processChartData(data2);
  }
}
async function fetchAndProcessData(date, chartOptions, series) {
  //const apiUrl = 'http://127.0.0.1:5000/api/new-endpoint'; // Пример URL API
  try {
    const responseBody = {filters: {
          interval: 'month',
          dateStart: date,// дата в unix
          works: null,
          carCenters: [carCenterIds.value], // Указаны для примера, измените по необходимости
          page: 1 // Указано для примера, измените по необходимости
          },
          step: filterPeriod.value}
    //const response = await apiClient.post('/analytics/get-center-KPD', responseBody);
    const response = await apiClient.post('/analytics/get-center-KPD', responseBody);
    if (response.data && response.data.bars) {
      processChartData(response.data, chartOptions, series);
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
}
function processChartData(apiResponse, chartOptions, series) {
  firstChartKey.value++;
  secondChartKey.value++;

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
  fetchAndProcessData(firstDate.value, firstChartOptions, firstChartSeries);
  if (secondDate.value) {
    fetchAndProcessData(secondDate.value, secondChartOptions, secondChartSeries);
  }
});
onMounted(fetchData);
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

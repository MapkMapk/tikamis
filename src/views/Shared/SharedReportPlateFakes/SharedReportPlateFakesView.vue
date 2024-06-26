<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <MainHeader />
  <MainHeaderGap />
  <DirectorReportComponent
    :is-filter-all-works-visible="false"
    @filtersApplied="fetchCustomerSkipsData"
    @optionSelected="changeOrsOption"
    :are-buttons-visible="displayedItems.length"
    @filtersReset="filtersReset"
    @updateFilters="updateFilters"
    @saveTable="onSave"
    @sendTable="onSend"
  >
    <template v-slot:tabular-title>
      <TabularPrimeTitle>Фальшивые гос.номера  {{ unixToDatePeriodHeader(filterDateStart, filterPeriod.option) }}</TabularPrimeTitle>
    </template>
    <template v-slot:tabular-table-header>
      <TableHeaders :columns="columns"  class="fat-boy" />
    </template>

    <template v-slot:tabular-table-table>
      <!--<TabularTableRow v-for="item in items" :key="item.orderId" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr .2fr;">-->
      <TabularTableRow
      v-for="item in displayedItems"
      v-if="displayedItems.length>0"
      :key="item.orderId"
      :item="item"
      @click="toggleDetails(item)" 
      :open="item.detailsOpen"
    >
      <template style="display: grid;;grid-template-columns: 3fr 1fr 1fr 3fr 2fr 2fr;" ><!--v-if="currentSort === 'itemsByMechanics'"-->
        <TabularTableRowCell>{{ truncateText(item.works[0], 33) }} 
        <span v-if="item.works.length > 1" style="float: inline-end;margin-right: 32px;"><strong>ещё {{ item.works.length-1 }}</strong></span>
        <details  class="custom-details" :style="{ width: CELL_WIDTH}">
        <summary class="flex" style="justify-content: space-between;" ><strong></strong></summary>
        <ul>
          <li v-for="work in item.works" :key="work.orderId">
          {{ work }}
          </li>
        </ul>
      </details>
        </TabularTableRowCell>
      <!-- Пост Работы Потери Время записи Телефон Автомобиль -->
      <TabularTableRowCell>{{ item.expectedPlate }}</TabularTableRowCell>
      <TabularTableRowCell>{{ item.factPlate }}</TabularTableRowCell>
      <!-- Перебор и отображение работ для каждой строки -->
      <TabularTableRowCell v-if="currentSort.option === 'itemsByPosts'">Пост №{{ item.postNumber }}</TabularTableRowCell>
      <TabularTableRowCell v-else>{{ item.mechanicName }}</TabularTableRowCell>
      
      <TabularTableRowCell>{{ unixToDate(item.unixBookingTime) }}</TabularTableRowCell>
      <!-- <TabularTableRowCell>{{ item.carCenterName }}</TabularTableRowCell>
      <TabularTableRowCell>{{ item.clientsCount }}</TabularTableRowCell> -->
      <!-- Условное отображение дополнительных данных для 'posts' -->
      
      <TabularTableRowCell>{{ item.phoneNumber }}</TabularTableRowCell>
        
      </template>
    </TabularTableRow>
    <TabularTableRow v-else class="h-[50vh]">
				<FiltersNoData></FiltersNoData>
			</TabularTableRow>
    </template>

  </DirectorReportComponent>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import DirectorReportComponent from '@/components/DirectorReportComponent.vue';
import TableHeaders from '@/components/Tabular/TableHeaders.vue';
import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
import TabularTableRowCell from '@/components/Tabular/TabularTableRowCell.vue';

import TabularTableRow from '@/components/Tabular/TabularTableRow.vue';

import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';

import { sadminApiClient } from '@/api/sadminApiClient';
import { directorApiClient } from '@/api/directorApiClient';
import isEnv from '@/utils/isEnv.js';
import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';
import FiltersNoData from '@/components/Tabular/FiltersNoData.vue';
import { convertToWorkDetailsTable } from '@/api/sendFunctions/skips.js'

import { unixToDatePeriodHeader, getUnixToday } from '@/utils/time/dateUtils.js';

const serviceStationsStore = useSadminServiceStationsStore();

const selectedCarCenterIds = computed(() => {
      // Замените эту логику на реальный вызов функции isEnv и доступ к serviceStationsStore
      return isEnv('sadmin') 
        ? [serviceStationsStore?.getSelectedServiceStation().id]
        : null;
    });
const CELL_WIDTH = '100%';
const items = ref([]);
const itemsByPosts = ref([]);
const itemsByMechanics = ref([]);
const currentSort = ref('itemsByMechanics');



function changeOrsOption(option){
  currentSort.value = option;
  console.warn(displayedItems.value.length);
  if (currentSort.value.option === 'itemsByPosts') {
    columns.value = [
      { header: 'Работы', size: '3fr' },
      { header: 'Записанный номер', size: '1fr' },
      { header: 'Фактический номер', size: '1fr' },
      { header: 'Пост', size: '3fr' },
      { header: 'Время записи', size: '2fr' },
      { header: 'Телефон', size: '2fr' },
    ];
  } else {
    // Предполагаемая структура колонок для "mechanics"
    columns.value = [
    { header: 'Работы', size: '3fr' },
      { header: 'Записанный номер', size: '1fr' },
      { header: 'Фактический номер', size: '1fr' },
      { header: 'Механик', size: '3fr' },
      { header: 'Время записи', size: '2fr' },
      { header: 'Телефон', size: '2fr' },
    ];
  }
}
const displayedItems = computed(() => {
  return currentSort.value.option === 'itemsByPosts' ? itemsByPosts.value : itemsByMechanics.value;
});

function toggleDetails(item) {
  item.detailsOpen = !item.detailsOpen;
}

function formatCurrency (sum) {
  // Добавление отступов
  let formattedTotalLoss = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(sum);
  return formattedTotalLoss;
};
const filterDateStart = ref(getUnixToday);
const filterPeriod = ref({option: 'month'});
function updateFilters(data){
  filterDateStart.value = data.dateStart//
  filterPeriod.value.option = data.period;
console.log(data);
}
function filtersReset(data){
  const { sort, ...params } = data; // Исключаем параметр sort из объекта data
  currentSort.value = sort;
  console.log(currentSort.value);
  fetchCustomerSkipsData(params);
}

onMounted(() => {
  // Предположим, что у вас есть начальные значения для фильтров
  // const initialFilters = { date: 1675623600, period: 'month', works: null };
  // fetchCustomerSkipsData(initialFilters.date, initialFilters.period, initialFilters.workId);
  // console.log(initialFilters.date);
});
// Обновление колонок в зависимости от currentSort
const columns = ref([]);

watch(currentSort.value.option, (newVal) => {
  console.log("Текущая сортировка:", newVal);
  if (newVal === 'itemsByPosts') {
    columns.value = [
      { header: 'Работы', size: '3fr' },
      { header: 'Записанный номер', size: '1fr' },
      { header: 'Фактический номер', size: '1fr' },
      { header: 'Пост', size: '3fr' },
      { header: 'Время записи', size: '2fr' },
      { header: 'Телефон', size: '2fr' },
    ];
  } else {
    // Предполагаемая структура колонок для "mechanics"
    columns.value = [
    { header: 'Работы', size: '3fr' },
      { header: 'Записанный номер', size: '1fr' },
      { header: 'Фактический номер', size: '1fr' },
      { header: 'Механик', size: '3fr' },
      { header: 'Время записи', size: '2fr' },
      { header: 'Телефон', size: '2fr' },
    ];
  }
}, { immediate: true });
function unixToDate(unixTime) {
  const date = new Date(unixTime * 1000); // Умножаем на 1000, так как в JavaScript время измеряется в миллисекундах, а не в секундах, как в Unix

  const day = String(date.getDate()).padStart(2, '0'); // День месяца с ведущим нулём, если нужно
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяц с ведущим нулём, так как в JavaScript месяцы нумеруются с 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0'); // Часы с ведущим нулём, если нужно
  const minutes = String(date.getMinutes()).padStart(2, '0'); // Минуты с ведущим нулём, если нужно

  const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;
  return formattedDate;
}



async function fetchCustomerSkipsData({ date, period, workId }) {
  console.log('*************************');
  console.log(date);
  console.log(period);
  console.log(workId);
  console.log('*************************');
  const filters = {
    interval: period,
    dateStart: date,
    works: Array.isArray(workId) ? workId : workId,
    carCenters: selectedCarCenterIds.value, // Указаны для примера, измените по необходимости
    page: 1 // Указано для примера, измените по необходимости
  };
  const apiClient = isEnv('sadmin') ? sadminApiClient : directorApiClient;
  try {
    
    const response = await apiClient.post('/report/get-plate-fakes', { filters });
    //console.log(response.data[currentSort.value][0].works);
    itemsByPosts.value = response.data.itemsByPosts;
    itemsByMechanics.value = response.data.itemsByMechanics;
    //updateColumns(currentSort.value);
  } catch (error) {
    console.log('error');
    console.error('Ошибка при загрузке данных:', error);
  }
}
async function onSave(){
  let title = `Фальшивые гос.номера  ${ unixToDatePeriodHeader(filterDateStart.value, filterPeriod.value.option) }`
  const apiClient = isEnv('sadmin') ? sadminApiClient : directorApiClient;
  let tableData = convertToWorkDetailsTable(title,displayedItems.value,currentSort.value.option);
const saveResponse = await apiClient.post('/report-save',tableData);
  console.log(saveResponse);
}
async function onSend(){
  let title = `Фальшивые гос.номера  ${ unixToDatePeriodHeader(filterDateStart.value, filterPeriod.value.option) }`
  const apiClient = isEnv('sadmin') ? sadminApiClient : directorApiClient;
  console.log(displayedItems.value);
  let tableData = convertToWorkDetailsTable(title,displayedItems.value,currentSort.value.option);
const saveResponse = await apiClient.post('/report-emails',tableData);
  console.log(saveResponse);
}
function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
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

.custom-details ul {
  padding-left: 0; /* Убираем стандартный отступ слева у списка */
  list-style-type: none; /* Убираем маркеры списка */
}

.custom-details li {
  display: block; /* Каждый элемент списка будет занимать всю ширину контейнера */
  text-align: left; /* Выравнивание текста по левому краю */
  padding: 4px 0; /* Добавляем немного отступа для каждого элемента списка */
}

/* Стили для выравнивания контента внутри details */
.custom-details summary {
  display: flex; /* Используем flexbox для выравнивания заголовка */
  justify-content: space-between; /* Распределяем пространство между элементами */
  align-items: center; /* Выравниваем элементы по центру по вертикали */
  padding: 4px 0; /* Добавляем немного отступа */
}
.fat-boy {
  overflow-x: auto; /* Добавляет горизонтальный скроллбар при необходимости */
}
</style>

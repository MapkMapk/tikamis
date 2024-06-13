<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <MainHeader />
  <MainHeaderGap />
  <DirectorReportComponent
    :is-filter-all-works-visible="true"
    :is-filter-or-visible="true"
    :are-buttons-visible="displayedItems.length"
    @filtersApplied="fetchCustomerSkipsData"
    @optionSelected="changeOrsOption"
    @filtersReset="filtersReset"
    @saveTable="onSave"
    @sendTable="onSend"
  >
    <template v-slot:tabular-title>
      <TabularPrimeTitle>Дополнительные работы {{ unixToDatePeriodHeader(filterDateStart, filterPeriod) }}</TabularPrimeTitle>
    </template>

    <template v-slot:tabular-table-header>
      <TableHeaders :columns="columns" />
    </template>

    <template v-slot:tabular-table-table>
      <!--<TabularTableRow v-for="item in items" :key="item.orderId" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr .2fr;">-->
      <TabularTableRow
      v-for="item in displayedItems"
      v-if="displayedItems.length"
      :key="item.orderId"
      :item="item"
      style="grid-template-columns: 4fr 3fr 1fr;"
      @click="toggleDetails(item)" 
      :open="item.detailsOpen"
      @saveTable="onSave"
      @sendTable="onSend"
    >
      
      <!-- Пост Работы Потери Время записи Телефон Автомобиль -->
      <TabularTableRowCell v-if="currentSort.option === 'itemsByPosts'">Пост №{{ item.postNumber }}</TabularTableRowCell>
      <TabularTableRowCell v-else>{{ item.mechanicName }}</TabularTableRowCell>
      <!-- Перебор и отображение работ для каждой строки -->
      <TabularTableRowCell :style="{ height: CELL_HEIGHT, width: '2fr' }" style="padding-left: 10px;">
      <strong>Все работы</strong>
      <details  class="custom-details" :style="{ width: CELL_WIDTH}">
        <summary class="flex" style="justify-content: space-between;">
         <strong></strong>
        </summary>
        <ul>
          <li v-for="work in item.works" :key="work.id">{{ truncateText(work.workName, 50) }}</li>
        </ul>
      </details>
    </TabularTableRowCell>
      <TabularTableRowCell>
        <div style="display: flex;justify-content: space-between">{{ formatCurrency(item.totalProfit) }}
      <div style="display: flex;justify-content: flex-end; padding-right: 10px">
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          <i class="material-icons" @click="toggleDetails(item.orderId)">
            {{ item.detailsOpen ? 'expand_less' : 'expand_more' }}
          </i>
        </div></div>
        <details class="custom-details" :style="{ width: CELL_WIDTH}">
        <summary class="flex" style="justify-content: space-between;"><strong></strong></summary>
        <ul>
          <li v-for="work in item.works" :key="work.id">
          {{ formatCurrency(work.profit) }}
        </li>
        </ul>
      </details></TabularTableRowCell>
    </TabularTableRow>
    <TabularTableRow v-else class="h-[50vh]">
				<FiltersNoData></FiltersNoData>
			</TabularTableRow>
    <TabularTableCellBottom style="display: grid; grid-template-columns: 7fr 1fr;">
      <p style="color: white;padding-left: 10px;">Итого потерь:</p>
      <p style="color: white;padding-left: 10px;">{{ formatCurrency(totalProfitSum) }}</p>
    </TabularTableCellBottom>
    </template>
    
  </DirectorReportComponent>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import DirectorReportComponent from '@/components/DirectorReportComponent.vue';
import TableHeaders from '@/components/Tabular/TableHeaders.vue';
import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
import TabularTableCellBottom from '@/components/Tabular/TabularTableCellBottom.vue';
import TabularTableRowCell from '@/components/Tabular/TabularTableRowCell.vue';
import { directorApiClient } from '@/api/directorApiClient';
import TabularTableRow from '@/components/Tabular/TabularTableRow.vue';
import FiltersNoData from '@/components/Tabular/FiltersNoData.vue';
import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';
import { sadminApiClient } from '@/api/sadminApiClient';
import isEnv from '@/utils/isEnv.js';
import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';
import { unixToDatePeriodHeader, getUnixToday } from '@/utils/time/dateUtils.js';

import { convertToTableFormat }  from '@/api/sendFunctions/added-works.js'

const serviceStationsStore = useSadminServiceStationsStore();

const items = ref([]);
const itemsByPosts = ref([]);
const itemsByMechanics = ref([]);
const totalProfit = ref(0);

const CELL_WIDTH = '100%';
const CELL_HEIGHT = '90%';

const filterDateStart = ref(getUnixToday())//
const filterPeriod = ref('month');
const currentSort = ref({option: 'itemsByMechanics'});
function changeOrsOption(option){
  console.log(currentSort.value);
  currentSort.value = option;
  console.warn(displayedItems.value.length);
  if (currentSort.value.option === 'itemsByPosts') {
    columns.value = [
      { header: 'Пост', size: '4fr' },
      { header: 'Работы', size: '3fr' },
      { header: 'Прибыль', size: '1fr' },
    ];
  } else {
    // Предполагаемая структура колонок для "mechanics"
    columns.value = [
      { header: 'Механик', size: '4fr' },
      { header: 'Работы', size: '3fr' },
      { header: 'Прибыль', size: '1fr' },
    ];
  }
  console.log(currentSort.value);
}
function toggleDetails(item) {
  item.detailsOpen = !item.detailsOpen;
}

onMounted(() => {
  // Предположим, что у вас есть начальные значения для фильтров
  const initialFilters = { date: getUnixToday(), period: 'month', works: null };
  fetchCustomerSkipsData(initialFilters);
  console.log('ВНИМАНИЕ, ЭТО ТЕСТОВАЯ СТРАНИЦА, ОНА ВЫВОДИТ ИНФОРМАЦИЮ ИЗ report/get-customer-skips');
  console.log(currentSort.value);
});
// Обновление колонок в зависимости от currentSort
const columns = ref([]);

// const getTotalLossSum = (items) => {
//   console.log(items);
//   // Инициализация переменной для хранения суммы
//   let totalLossSum = 0;
//   // Перебор всех элементов массива items
//   items.forEach((item) => {
//     // Добавление totalLoss каждого элемента к общей сумме
//     totalLossSum += item.totalLoss;
//   });
//   // Возврат общей суммы
//   return totalLossSum;
// };
const totalProfitSum = computed(() => {
  return displayedItems.value.reduce((sum, item) => sum + (item.totalProfit || 0), 0);
});
function formatCurrency (sum) {
  // Добавление отступов
  let formattedTotalProfit = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(sum);
  return formattedTotalProfit;
};
function filtersReset(data){
  const { sort, ...params } = data; // Исключаем параметр sort из объекта data
  currentSort.value.option = sort;
  console.log(currentSort.value);
  fetchCustomerSkipsData(params);
}
watch(currentSort.value.option, (newVal) => {
  if (newVal === 'itemsByPosts') {
    columns.value = [
      { header: 'Пост', size: '4fr' },
      { header: 'Работы', size: '3fr' },
      { header: 'Прибыль', size: '1fr' },
    ];
  } else {
    // Предполагаемая структура колонок для "mechanics"
    columns.value = [
    { header: 'Механик', size: '4fr' },
      { header: 'Работы', size: '3fr' },
      { header: 'Прибыль', size: '1fr' },
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


const displayedItems = computed(() => {
  return currentSort.value.option === 'itemsByPosts' ? itemsByPosts.value : itemsByMechanics.value;
});
function processWorkId(workId) {
  if (workId === null) {
    return null;
  } else if (Array.isArray(workId)) {
    return workId;
  } else if (typeof workId === 'string') {
    return workId.includes(',') ? workId.split(',') : [workId];
  } else {
    return [workId];
  }
}
const selectedCarCenterIds = computed(() => {
      // Замените эту логику на реальный вызов функции isEnv и доступ к serviceStationsStore
      return isEnv('sadmin') 
        ? [serviceStationsStore?.getSelectedServiceStation().id]
        : null;
    });

async function fetchCustomerSkipsData({ date, period, workId }) {
  filterDateStart.value = {date}.date;
  filterPeriod.value = {period}.period;
  console.log(filterDateStart.value);
  console.log(filterPeriod.value);
  const works = processWorkId(workId);
  const filters = {
    interval: period,
    dateStart: date,
    works: works,
    carCenters: selectedCarCenterIds.value, // Указаны для примера, измените по необходимости
    page: 1 // Указано для примера, измените по необходимости
  };

  try {
    const apiClient = isEnv('sadmin') ? sadminApiClient : directorApiClient;
    const response = await apiClient.post('/report/get-added-works', { filters });//get-customer-skips
    //console.log(response.data[currentSort.value][0].works);
    itemsByPosts.value = response.data.itemsByPosts;
    itemsByMechanics.value = response.data.itemsByMechanics;
    totalProfit.value = response.data.itemsByMechanics.totalProfit;
    //updateColumns(currentSort.value);
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
}
function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}

async function onSave(){
  const apiClient = isEnv('sadmin') ? sadminApiClient : directorApiClient;
  let title = `Дополнительные работы ${unixToDatePeriodHeader(filterDateStart.value, filterPeriod.value)}`;
  let tableData = convertToTableFormat(title,columns.value,displayedItems.value,currentSort.value.option);

  console.log(tableData)
  const saveResponse = await apiClient.post('/report-save',tableData);
  console.log(saveResponse);
}
async function onSend(){
  const apiClient = isEnv('sadmin') ? sadminApiClient : directorApiClient;
  let title = `Дополнительные работы ${unixToDatePeriodHeader(filterDateStart.value, filterPeriod.value)}`;
  let tableData = convertToTableFormat(title,columns.value,displayedItems.value,currentSort.value.option);

  console.log(tableData)
  const saveResponse = await apiClient.post('/report-emails',tableData);
  console.log(saveResponse);
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

</style>


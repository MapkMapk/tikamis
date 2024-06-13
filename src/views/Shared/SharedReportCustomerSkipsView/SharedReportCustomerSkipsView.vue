<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <MainHeader />
  <MainHeaderGap />
  <DirectorReportComponent
    :is-filter-all-works-visible="true"
    :is-filter-or-visible="true"
    :are-buttons-visible="displayedItems.length>0"
    @filtersApplied="fetchCustomerSkipsData"
    @optionSelected="changeOrsOption"
    @filtersReset="filtersReset"
    @updateFilters="updateFilters"
    @saveTable="onSave"
    @sendTable="onSend"
  >
    <template v-slot:tabular-title>
      <TabularPrimeTitle>Не приехавшие клиенты {{ unixToDatePeriodHeader(filterDateStart, filterPeriod) }}</TabularPrimeTitle>
    </template>

    <template v-slot:tabular-table-header>
      <TableHeaders :columns="columns" />
    </template>

    <template v-slot:tabular-table-table>
      <!--<TabularTableRow v-for="item in items" :key="item.orderId" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr .2fr;">-->
      <TabularTableRow
      v-for="item in displayedItems"
      v-if="displayedItems.length>0"
      :key="item.orderId"
      :item="item"
      style="grid-template-columns: 2fr 4fr 1fr 2fr 2fr 2fr;"
      @click="toggleDetails(item)" 
      :open="item.detailsOpen"
    >
      <!-- Пост Работы Потери Время записи Телефон Автомобиль -->
      <TabularTableRowCell v-if="currentSort.option === 'itemsByPosts'">Пост №{{ item.postNumber }}</TabularTableRowCell>
      <TabularTableRowCell v-else>{{ item.mechanicName }}</TabularTableRowCell>
      <!-- Перебор и отображение работ для каждой строки -->
      <TabularTableRowCell :style="{ height: CELL_HEIGHT, width: '2fr' }" style="padding-left: 10px;" >
      <p style="opacity: 0;">dsfdsfdsfsdsfsdfsd</p>
      <details  class="custom-details">
        <summary class="flex" style="justify-content: space-between;">
         <strong></strong>
        </summary>
        <ul>
          <li v-for="work in item.works" :key="work.id">{{ truncateText(work.workName, 50) }}</li>
        </ul>
      </details>
    </TabularTableRowCell>
      <TabularTableRowCell>{{ formatCurrency(item.totalLoss) }}
        <details  class="custom-details">
        <summary class="flex" style="justify-content: space-between;"><strong></strong></summary>
        <ul>
          <li v-for="work in item.works" :key="work.id">
          {{ work.loss }}
        </li>
        </ul>
      </details></TabularTableRowCell>
      <TabularTableRowCell><p style="opacity: 0;">dsfdsfdsfsdsfsdfsd</p>
        <details  class="custom-details">
        <summary class="flex" style="justify-content: space-between;" ><strong></strong></summary>
        <ul>
          <li v-for="work in item.works" :key="work.id">
          {{ unixToDate(work.unixBookingTime) }}
        </li>
        </ul>
      </details>
        </TabularTableRowCell>
      <!-- <TabularTableRowCell>{{ item.carCenterName }}</TabularTableRowCell>
      <TabularTableRowCell>{{ item.clientsCount }}</TabularTableRowCell> -->
      <!-- Условное отображение дополнительных данных для 'posts' -->
      
        
      <TabularTableRowCell>
        <details  class="custom-details">
        <summary class="flex" style="justify-content: space-between;" ><strong>Клиенты ({{ item.works.length }})</strong></summary>
        <ul>
          <li v-for="work in item.works" :key="work.id">
          {{ work.phone }}
        </li>
        </ul>
      </details>
        </TabularTableRowCell>
        <TabularTableRowCell>
        
        <div style="display: flex;justify-content: flex-end; padding-right: 10px">
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          <i class="material-icons">
            {{ item.detailsOpen ? 'expand_less' : 'expand_more' }}
          </i>
        </div>
        <details class="custom-details">
        <summary class="flex" style="justify-content: space-between;" ><strong></strong></summary>
        <ul>
          <li v-for="work in item.works" :key="work.id">
          {{ work.plate }}
        </li>
        </ul>
      </details>
        </TabularTableRowCell>
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
import { unixToDatePeriodHeader, getUnixToday } from '@/utils/time/dateUtils.js';
import FiltersNoData from '@/components/Tabular/FiltersNoData.vue';
import { convertToLossTableFormat } from '@/api/sendFunctions/skips.js'
const serviceStationsStore = useSadminServiceStationsStore();

const items = ref([]);
const itemsByPosts = ref([]);
const itemsByMechanics = ref([]);
const currentSort = ref({option: 'itemsByMechanics'});

function formatCurrency (sum) {
  // Добавление отступов
  let formattedTotalLoss = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(sum);
  return formattedTotalLoss;
};

const columns = ref([]);
const CELL_HEIGHT = '90%';

function changeOrsOption(option){
  currentSort.value = option;
  console.warn(displayedItems.value.length);
  if (currentSort.value.option === 'itemsByPosts') {
    columns.value = [
      { header: 'Пост', size: '2fr' },
      { header: 'Работы', size: '4fr' },
      { header: 'Потери', size: '1fr' },
      { header: 'Время записи', size: '2fr' },
      { header: 'Телефон', size: '2fr' },
      { header: 'Автомобиль', size: '2fr' },
    ];
  } else {
    // Предполагаемая структура колонок для "mechanics"
    columns.value = [
      { header: 'Механик', size: '2fr' },
      { header: 'Работы', size: '4fr' },
      { header: 'Потери', size: '1fr' },
      { header: 'Время записи', size: '2fr' },
      { header: 'Телефон', size: '2fr' },
      { header: 'Автомобиль', size: '2fr' },
    ];
  }
}


const filterDateStart = ref(getUnixToday());
const filterPeriod = ref('month');
onMounted(() => {
  // Предположим, что у вас есть начальные значения для фильтров
  const initialFilters = { date: getUnixToday(), period: 'month', works: null };
  fetchCustomerSkipsData(initialFilters);
  console.log(items.value);
});
// Обновление колонок в зависимости от currentSort

watch(currentSort.value.option, (newVal) => {
  if (newVal === 'itemsByPosts') {
    columns.value = [
      { header: 'Пост', size: '2fr' },
      { header: 'Работы', size: '4fr' },
      { header: 'Потери', size: '1fr' },
      { header: 'Время записи', size: '2fr' },
      { header: 'Телефон', size: '2fr' },
      { header: 'Автомобиль', size: '2fr' },
    ];
  } else {
    // Предполагаемая структура колонок для "mechanics"
    columns.value = [
      { header: 'Механик', size: '2fr' },
      { header: 'Работы', size: '4fr' },
      { header: 'Потери', size: '1fr' },
      { header: 'Время записи', size: '2fr' },
      { header: 'Телефон', size: '2fr' },
      { header: 'Автомобиль', size: '2fr' },
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

function toggleDetails(item) {
  item.detailsOpen = !item.detailsOpen;
}
const displayedItems = computed(() => {
  return currentSort.value.option === 'itemsByPosts' ? itemsByPosts.value : itemsByMechanics.value;
  });

  const selectedCarCenterIds = computed(() => {
      // Замените эту логику на реальный вызов функции isEnv и доступ к serviceStationsStore
      return isEnv('sadmin') 
        ? [serviceStationsStore?.getSelectedServiceStation().id]
        : null;
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

async function fetchCustomerSkipsData({ date, period, workId }) {
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
    const response = await apiClient.post('/report/get-customer-skips', { filters });
    //console.log(response.data[currentSort.value][0].works);
    itemsByPosts.value = response.data.itemsByPosts;
    itemsByMechanics.value = response.data.itemsByMechanics;
    console.log(itemsByPosts.value);
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



function filtersReset(data){
  const { sort, ...params } = data; // Исключаем параметр sort из объекта data
  currentSort.value = sort;
  console.log(currentSort.value);
  fetchCustomerSkipsData(params);
}
function updateFilters(data){
filterDateStart.value = data.dateStart;
filterPeriod.value = data.period;
}
async function onSave(){
  const apiClient = isEnv('sadmin') ? sadminApiClient : directorApiClient;
  let title = `Не приехавшие клиенты ${ unixToDatePeriodHeader(filterDateStart.value, filterPeriod.value) }`;
  let tableData = convertToLossTableFormat(title,displayedItems.value,currentSort.value.option);
  console.log(tableData)
  const saveResponse = await apiClient.post('/report-save',tableData);
  console.log(saveResponse);
}
async function onSend(){
  const apiClient = isEnv('sadmin') ? sadminApiClient : directorApiClient;
  let title = `Не приехавшие клиенты ${ unixToDatePeriodHeader(filterDateStart.value, filterPeriod.value) }`;
  let tableData = convertToLossTableFormat(title,displayedItems.value,currentSort.value.option);
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
p{cursor: pointer;}
text{cursor: pointer;}
</style>

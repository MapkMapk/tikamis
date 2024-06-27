<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <MainHeader />
  <MainHeaderGap />
  <DirectorReportComponent
    :is-filter-all-works-visible="false"
    :is-filter-or-visible="true"
    :are-buttons-visible="displayedItems.length>0"
    @filtersApplied="fetchCustomerSkipsData"
    @optionSelected="changeOrsOption"
    @worksLoaded="handleAllWorksLoaded"
    @filtersReset="filtersReset"
    @updateFilters="updateFilters"
    @saveTable="onSaveTable"
    @sendTable="onSendTable"
  >
    <template v-slot:tabular-title>
      <TabularPrimeTitle>Простои постов {{unixToDatePeriodHeader(filterDateStart, filterPeriod.option)}}</TabularPrimeTitle>
    </template>

    <template v-slot:tabular-table-header>
      <TableHeaders :columns="columns" />
    </template>

    <template v-slot:tabular-table-table>
  <TabularTableRow 
    v-for="item in displayedItems"
    v-if="displayedItems.length"
    :key="item.postNumber || item.mechanicName" 
    :item="item" 
    style="grid-template-columns: 4fr 2fr 1fr;"
    @click="toggleDetails(item)" 
    :open="item.detailsOpen">
    <!-- Условное отображение номера поста или имени механика -->
    <TabularTableRowCell v-if="currentSort.option === 'itemsByPosts'">Пост №{{ item.postNumber }}</TabularTableRowCell>
    <TabularTableRowCell v-else>{{ item.mechanicName }}</TabularTableRowCell>
    <!-- Перебор и отображение работ для каждой строки -->
    <TabularTableRowCell :style="{width: '2fr'}" style="padding-left: 10px;">
      <strong>{{ item.totalDowntime }}</strong>
      <details class="custom-details">
        <summary class="flex" style="justify-content: space-between;">
          <strong></strong>
        </summary>
        <ul>
          <li v-for="downtime in item.downtimes" :key="downtime.id">
            {{ downtime.downtimeMinutes }}
          </li>
        </ul>
      </details>
    </TabularTableRowCell>
    <TabularTableRowCell><div style="display: flex;justify-content: space-between"><strong>Все простои</strong>
      <div style="display: flex;justify-content: flex-end; padding-right: 10px">
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          <i class="material-icons">
            {{ item.detailsOpen ? 'expand_less' : 'expand_more' }}
          </i>
        </div></div>
        <details class="custom-details">
        <summary class="flex" style="justify-content: space-between;">
          <strong></strong>
        </summary>
        <ul>
          <li v-for="downtime in item.downtimes" :key="downtime.id">
            {{ unixToDate(downtime.unixTime) }}
          </li>
        </ul>
      </details>
    </TabularTableRowCell>
  </TabularTableRow>
  <TabularTableRow v-else class="h-[50vh]">
				<FiltersNoData></FiltersNoData>
			</TabularTableRow>
  <TabularTableCellBottom style="display: grid; grid-template-columns: 4fr 3fr;">
    <p style="color: white;padding-left: 10px;">Итого простоя:</p>
    <p style="color: white;padding-left: 10px">{{ formatTotalDowntime(totalLoss) }}</p>
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

import { sadminApiClient } from '@/api/sadminApiClient';
import { directorApiClient } from '@/api/directorApiClient';
import isEnv from '@/utils/isEnv.js';
import FiltersNoData from '@/components/Tabular/FiltersNoData.vue';
import { convertToDowntimeTableFormat } from '@/api/sendFunctions/postsDowntime';

import TabularTableRow from '@/components/Tabular/TabularTableRow.vue';

import { toggleDetails, formatTotalDowntime, formatCurrency, selectedCarCenterIds, truncateText, unixToData } from '@/utils/Things.js'; // Импорт функций из файла

import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';
import { unixToDatePeriodHeader, getUnixToday } from '@/utils/time/dateUtils.js';
import { unixToDate } from '@/utils/time/dateUtils.js';
import handleFileDownload from '@/utils/fileDownload.js';
const currentSort = ref('itemsByMechanics');
const totalLoss = ref(0);
const itemsByPosts = ref([]);
const itemsByMechanics = ref([]);
const tableData = ref([]);

const filterDateStart = ref(getUnixToday())//
const filterPeriod = ref({option: 'month'});


function changeOrsOption(option){
  currentSort.value = option;
  console.warn(displayedItems.value.length);
  if (currentSort.value.option === 'itemsByPosts') {
    columns.value = [
      { header: 'Пост', size: '4fr' },
      { header: 'Время простоя, мин', size: '2fr' },
      { header: 'Дата', size: '1fr' },
    ];
  } else {
    // Предполагаемая структура колонок для "mechanics"
    columns.value = [
      { header: 'Механик', size: '4fr' },
      { header: 'Время простоя, мин', size: '2fr' },
      { header: 'Дата', size: '1fr' },
    ];
    console.log(currentSort.value.option)
  }
}

onMounted(async () => {
  const initialFilters = { date: getUnixToday(), period: 'month', works: null };
  changeOrsOption(currentSort.value);
  fetchCustomerSkipsData(initialFilters);
});
function handleAllWorksLoaded(ids) {
    const { dateStart, period, workId } = ids;
    console.log(dateStart);
    console.log(period);
    console.log(workId);
    fetchCustomerSkipsData({ date: dateStart, period, workId });
  }
// Обновление колонок в зависимости от currentSort
const columns = ref([]);




const displayedItems = computed(() => {
  return currentSort.value.option === 'itemsByPosts' ? itemsByPosts.value : itemsByMechanics.value;
});

function updateFilters(data){
  filterDateStart.value = data.dateStart;
  filterPeriod.value.option = data.period;
console.log(data);
}
function filtersReset(data){
  const { sort, ...params } = data; // Исключаем параметр sort из объекта data
  currentSort.value = sort;
  console.log(currentSort.value);
  fetchCustomerSkipsData(params);
}
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
  //const works = processWorkId(workId);
  const filters = {
    interval: period,
    dateStart: date,
    works: null,
    carCenters: selectedCarCenterIds.value, // Указаны для примера, измените по необходимости
    page: 1 // Указано для примера, измените по необходимости
  };

  try {

    const apiClient = isEnv('sadmin') ? sadminApiClient : directorApiClient;
    const response = await apiClient.post('/report/get-posts-downtime', { filters });
    //console.log(response.data[currentSort.value][0].works);
    //items.value = response.data[currentSort.value];
    //totalLoss.value = response.data.allLoss;
    itemsByPosts.value = response.data.itemsByPosts;
    itemsByMechanics.value = response.data.itemsByMechanics;
    totalLoss.value = response.data.allDownTime;
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
}


async function onSaveTable(){
 
 const apiClient = isEnv('sadmin') ? sadminApiClient : directorApiClient;
 
 let title = `Простои постов ${unixToDatePeriodHeader(filterDateStart.value, filterPeriod.value.option)}`;

//простои постов обеспечить функционал tabularTitle, tableHeaders, data, filter
let tableData = convertToDowntimeTableFormat(title,columns.value,displayedItems.value,currentSort.value.option)

const saveResponse = await apiClient.post('/report-save',tableData,{ responseType: 'arraybuffer' });
try{
    handleFileDownload(saveResponse.data, `${title}.xlsx`);
  }
  catch (error) {
    console.error('Error saving the table and downloading the file', error);
  }
}



async function onSendTable(){
  const apiClient = isEnv('sadmin') ? sadminApiClient : directorApiClient;
 
 let title = `Простои постов ${unixToDatePeriodHeader(filterDateStart.value, filterPeriod.value.option)}`;

//простои постов обеспечить функционал tabularTitle, tableHeaders, data, filter
let tableData = convertToDowntimeTableFormat(title,columns.value,displayedItems.value,currentSort.value.option)

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



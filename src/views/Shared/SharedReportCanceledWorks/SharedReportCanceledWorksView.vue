<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <MainHeader />
  <MainHeaderGap />
  <DirectorReportComponent 
    :is-filter-all-works-visible="true" 
    @filtersApplied="fetchCustomerSkipsData"
    @OptionSelected="changeOrsOption" 
    @worksLoaded="handleAllWorksLoaded"
    :are-buttons-visible="displayedItems.length"
    @filtersReset="filtersReset"
    @updateFilters="updateFilters"
    @saveTable="onSave"
    @sendTable="onSend"
>
    <template v-slot:tabular-title>
      <TabularPrimeTitle @click="displayLog">Заказанные, но не выполненные работы {{ unixToDatePeriodHeader(filterDateStart, filterPeriod) }}</TabularPrimeTitle>
    </template>
    <template v-slot:tabular-table-header>
      <TableHeaders :columns="columns" />
    </template>
    <template v-slot:tabular-table-table>
      <TabularTableRow 
        v-for="item in displayedItems" 
        v-if="displayedItems.length>0"
        :key="item.postNumber || item.mechanicName" 
        :item="item"
        :style="{ gridTemplateColumns: '4fr 3fr 1fr' }"
        @click="toggleDetails(item)" 
        :open="item.detailsOpen"
        >
        <TabularTableRowCell v-if="currentSort === 'itemsByPosts'" >Пост №{{ item.postNumber }}</TabularTableRowCell>
        <TabularTableRowCell v-else >{{ item.mechanicName }}</TabularTableRowCell>
        <TabularTableRowCell :style="{ width: '2fr', paddingLeft: '10px' }">
          <strong>Все работы</strong>
          <details class="custom-details" >
            <summary class="flex" style="justify-content: space-between;">
              <strong></strong>
            </summary>
            <ul>
              <li v-for="work in item.works" :key="work.id">{{ truncateText(work.workName, 50) }}</li>
            </ul>
          </details>
        </TabularTableRowCell>
        <TabularTableRowCell >
          <div class="flex justify-between">
            {{ formatCurrency(item.totalLoss) }}
            <div class="flex justify-end pr-2">
              <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
              <i class="material-icons">
                {{ item.detailsOpen ? 'expand_less' : 'expand_more' }}
              </i>
            </div>
          </div>
          <details class="custom-details" :style="{ width: CELL_WIDTH }">
            <summary class="flex justify-between">
              <strong></strong>
            </summary>
            <ul>
              <li v-for="work in item.works" :key="work.id">{{ formatCurrency(work.loss) }}</li>
            </ul>
          </details>
        </TabularTableRowCell>
      </TabularTableRow>
      <TabularTableRow v-else class="h-[50vh]">
				<FiltersNoData></FiltersNoData>
			</TabularTableRow>
      <TabularTableCellBottom class="grid grid-cols-8">
        <p class="text-white pl-2 col-span-7">Итого потерь:</p>
        <p class="text-white pl-2 col-span-1">{{ formatCurrency(totalLoss) }}</p>
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
import { sadminApiClient } from '@/api/sadminApiClient';
import isEnv from '@/utils/isEnv.js';
import { fetchCustomerData } from '@/components/fetchCustomerData';
import TabularTableRow from '@/components/Tabular/TabularTableRow.vue';

import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';
import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';

import FiltersNoData from '@/components/Tabular/FiltersNoData.vue';
//import { convertToTableFormat }  from '@/api/sendFunctions/reviews.js'
import { convertToLossTableFormatV2 } from '@/api/sendFunctions/skips.js'
import { unixToDatePeriodHeader, getUnixToday } from '@/utils/time/dateUtils.js';
import handleFileDownload from '@/utils/fileDownload.js';
const sadminServiceStationsStore = useSadminServiceStationsStore();
const apiClient = isEnv('sadmin') ? sadminApiClient : directorApiClient;

const CELL_WIDTH = '100%';
const totalLoss = ref(0);


const filterDateStart = ref(getUnixToday());
const filterPeriod = ref('month')
const currentSort = ref('itemsByMechanics');
const itemsByPosts = ref([]);
const itemsByMechanics = ref([]);
const columns = ref([]);
function updateFilters(data) {
  filterDateStart.value = data.dateStart;
  filterPeriod.value = data.period
}

function formatCurrency(sum) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(sum);
}
function toggleDetails(item) {
  item.detailsOpen = !item.detailsOpen;
}

watch(() => currentSort.value, (newVal) => {
  columns.value = newVal === 'itemsByPosts'
    ? [
      { header: 'Пост', size: '4fr' },
      { header: 'Работы', size: '3fr' },
      { header: 'Потери', size: '1fr' },
    ]
    : [
      { header: 'Механик', size: '4fr' },
      { header: 'Работы', size: '3fr' },
      { header: 'Потери', size: '1fr' },
    ];
}, { immediate: true });

function truncateText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

function changeOrsOption(newValue) {
  currentSort.value = newValue.option;
}

const displayedItems = computed(() => {
  return currentSort.value === 'itemsByPosts' ? itemsByPosts.value : itemsByMechanics.value;
});
function displayLog(){
  console.log(columns.value);
  console.log(displayedItems.value)
}
const selectedCarCenterIds = computed(() => {
  return isEnv('sadmin')
    ? [sadminServiceStationsStore?.getSelectedServiceStation().id]
    : null;
});
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
  const works = processWorkId(workId);
  const params = { date, period, workId: works };
  console.log(params);
  try {
    const data = await fetchCustomerData(apiClient, '/report/get-cancelled-works', selectedCarCenterIds, { date, period, workId });
    itemsByPosts.value = data.itemsByPosts || [];
    itemsByMechanics.value = data.itemsByMechanics || [];
    totalLoss.value = data.allLoss || 0;
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
}

function handleAllWorksLoaded(ids) {
  const { dateStart, period, workId } = ids;
  fetchCustomerSkipsData({ date: dateStart, period, workId });
}

onMounted(async () => {
  const initialFilters = { date: filterDateStart.value, period: filterPeriod.value, works: null };
  await fetchCustomerSkipsData(initialFilters);
});
async function onSave(){
  const apiClientic = isEnv('sadmin') ? sadminApiClient : directorApiClient;
  let title = `Заказанные, но не выполненные работы ${ unixToDatePeriodHeader(filterDateStart.value, filterPeriod.value) }`;
  let tableData = convertToLossTableFormatV2(title,displayedItems.value,currentSort.value);
  console.log(tableData)
  const saveResponse = await apiClientic.post('/report-save',tableData,
  { responseType: 'arraybuffer' });
  try{
    handleFileDownload(saveResponse.data, `${title}.xlsx`);
  }
  catch (error) {
    console.error('Error saving the table and downloading the file', error);
  }
  console.log(saveResponse);
}
async function onSend(){
  const apiClientic = isEnv('sadmin') ? sadminApiClient : directorApiClient;
  let title = `Заказанные, но не выполненные работы ${ unixToDatePeriodHeader(filterDateStart.value, filterPeriod.value) }`;
  let tableData = convertToLossTableFormatV2(title,displayedItems.value,currentSort.value);
  console.log(tableData)
  const saveResponse = await apiClientic.post('/report-emails',tableData);
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

.custom-details {
  margin-right: 50px;
}

.custom-details[open] summary:after {
  transform: rotate(-90deg);
}

.report-table-row:nth-child(odd) {
  background-color: #f5f5f5;
}

.custom-details ul {
  padding-left: 0;
  /* Убираем стандартный отступ слева у списка */
  list-style-type: none;
  /* Убираем маркеры списка */
}

.custom-details li {
  display: block;
  /* Каждый элемент списка будет занимать всю ширину контейнера */
  text-align: left;
  /* Выравнивание текста по левому краю */
  padding: 4px 0;
  /* Добавляем немного отступа для каждого элемента списка */
}

/* Стили для выравнивания контента внутри details */
.custom-details summary {
  display: flex;
  /* Используем flexbox для выравнивания заголовка */
  justify-content: space-between;
  /* Распределяем пространство между элементами */
  align-items: center;
  /* Выравниваем элементы по центру по вертикали */
  padding: 4px 0;
  /* Добавляем немного отступа */
}
</style>

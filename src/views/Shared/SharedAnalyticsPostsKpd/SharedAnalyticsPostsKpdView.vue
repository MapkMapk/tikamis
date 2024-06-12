<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <MainHeader />
  <MainHeaderGap />
  <DirectorReportComponent
    :is-filter-all-works-visible="true"
    :are-buttons-visible="displayedItems.length"
    @filtersApplied="fetchData"
    @worksLoaded="handleAllWorksLoaded"
    @optionSelected="updateSortOption"
    @updateFilters="onUpdateFilters"
    @saveTable="onSaveTable"
    @sendTable="onSendTable"
    @filtersReset="fetchData"
  >
    <template v-slot:tabular-title>
      <TabularPrimeTitle @click="displayLog">Кпд постов {{ unixToDatePeriodHeader(filterDate.date, filterPeriod.period) }}</TabularPrimeTitle>
    </template>

    <template v-slot:tabular-table-header>
      <TableHeaders :columns="columns" />
    </template>

    <template v-slot:tabular-table-table>
      <TabularTableRow
        v-for="item in displayedItems"
        v-if="displayedItems.length"
        :key="item.orderId"
        :item="item"
        style="grid-template-columns: 4fr 3fr 1fr;"
      >
        <TabularTableRowCell v-if="currentSortOption.option === 'itemsByPosts'">Пост №{{ item.postNumber }}</TabularTableRowCell>
        <TabularTableRowCell v-else>{{ item.mechanicName }}</TabularTableRowCell>
        
        <TabularTableRowCell :style="{ height: CELL_HEIGHT, width: '2fr', paddingLeft: '10px' }">
          <strong>Все работы</strong>
          <details class="custom-details" :style="{ width: CELL_WIDTH }">
            <summary class="flex" style="justify-content: space-between;"><strong></strong></summary>
            <ul>
              <li v-for="work in item.works" :key="work.id">{{ truncateText(work.workName, 50) }}</li>
            </ul>
          </details>
        </TabularTableRowCell>
        
        <TabularTableRowCell :class="getDeviationClass(item.totalDeviationMinutes)">
          {{ formatDeviation(item.totalDeviationMinutes) }}
          <details class="custom-details" :style="{ width: CELL_WIDTH }">
            <summary class="flex" style="justify-content: space-between;"><strong></strong></summary>
            <ul>
              <li v-for="work in item.works" :key="work.id" :class="getDeviationClass(work.deviationMinutes)">
                {{ formatDeviation(work.deviationMinutes) }}
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
import { processData } from '@/api/sendFunctions/postsKpd';
import unixToData from '@/utils/time/unixToData';
import { unixToDatePeriodHeader, getUnixToday } from '@/utils/time/dateUtils.js';
import FiltersNoData from '@/components/Tabular/FiltersNoData.vue';
const serviceStationsStore = useSadminServiceStationsStore();
const apiClient = isEnv('sadmin') ? sadminApiClient : directorApiClient;
const apiUrl = '/analytics/get-posts-KPD';
const currentSortOption = ref({ option: 'itemsByMechanics' });
const itemsByPosts = ref([]);
const itemsByMechanics = ref([]);
const columns = ref([]);
const CELL_WIDTH = '100%';
const CELL_HEIGHT = '90%';
const filterDate = ref(getUnixToday());
const filterPeriod = ref('month');
const selectedCarCenterId = computed(() => isEnv('sadmin') ? [serviceStationsStore?.getSelectedServiceStation().id] : null);
const tableData = ref([]);

const initialFilters = { date: filterDate.value, period: filterPeriod.value, works: null };
const activeFilters = ref(initialFilters);

function onUpdateFilters(data) {
  activeFilters.value = {
    interval: data.period,
    dateStart: data.dateStart,
    works: data.workId,
    carCenters: selectedCarCenterId.value,
    page: 1
  };
}

onMounted(() => {
  updateSortOption(currentSortOption.value); // Передаем весь объект
  fetchData(initialFilters);
});

function updateSortOption(option) {
  if (!option) {
    console.error('Option is undefined');
    return;
  }

  const actualOption = typeof option === 'object' ? option.option : option;
  console.log(actualOption);

  currentSortOption.value.option = actualOption;
  columns.value = [
    { header: actualOption === 'itemsByPosts' ? 'Пост' : 'Механик', size: '4fr' },
    { header: 'Работы', size: '3fr' },
    { header: 'Потери', size: '1fr' },
  ];
}

watch(
  () => currentSortOption.value.option,
  (newVal) => {
    console.log(newVal);
    updateSortOption(newVal);
  }
);
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
async function fetchData({ date, period, workId }) {
  console.log({ date });
  console.log({period});
  console.log({workId});
  const works = processWorkId(workId);
  filterDate.value = { date };
  filterPeriod.value = { period };
  activeFilters.value = {
    interval: period,
    dateStart: date,
    works: works,
    carCenters: selectedCarCenterId.value,
    page: 1
  };

  try {
    const response = await apiClient.post(apiUrl, { filters: activeFilters.value });
    itemsByPosts.value = response.data.itemsByPosts || [];
    itemsByMechanics.value = response.data.itemsByMechanics || [];
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
}

function handleAllWorksLoaded(ids) {
  const { dateStart, period, workId } = ids;
  fetchData({ date: dateStart, period, workId });
}

const displayedItems = computed(() => currentSortOption.value.option === 'itemsByPosts' ? itemsByPosts.value : itemsByMechanics.value);

function truncateText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

function getDeviationClass(value) {
  return {
    'text-green': value < 0,
    'text-red': value > 0
  };
}

function formatDeviation(value) {
  return value > 0 ? `+${value}` : value.toString();
}

async function onSaveTable() {
  tableData.value = processData(columns.value, displayedItems.value, currentSortOption.value.option);
  const kpdPostsDate = `Кпд постов ${unixToData(filterDate.value.date, false, filterPeriod)}`;
  const tableDataContent = tableData.value;
  const mailResponse = await apiClient.post('/report-emails', { title: kpdPostsDate, content: tableDataContent });
  console.log(mailResponse);
}

async function onSendTable() {
  tableData.value = processData(columns.value, displayedItems.value, currentSortOption.value.option);
  const kpdPostsDate = `Кпд постов ${unixToData(filterDate.value.date, false, filterPeriod)}`;
  const tableDataContent = tableData.value;
  const mailResponse = await apiClient.post('/report-save', { title: kpdPostsDate, content: tableDataContent });
  console.log(mailResponse);
}
</script>

<style scoped>
.text-red {
  color: red;
  font-weight: bold;
}

.text-green {
  color: green;
}
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


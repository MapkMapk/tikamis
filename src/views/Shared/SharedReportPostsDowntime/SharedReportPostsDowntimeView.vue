<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <MainHeader />
  <MainHeaderGap />
  <DirectorReportComponent
    :is-filter-all-works-visible="false"
    :is-filter-or-visible="true"
    @filtersApplied="fetchCustomerSkipsData"
    @optionSelected="changeOrsOption"
    @worksLoaded="handleAllWorksLoaded"
    @saveTable="onSaveTable"
    @sendTable="onSendTable"
  >
    <template v-slot:tabular-title>
      <TabularPrimeTitle>Простои постов</TabularPrimeTitle>
    </template>

    <template v-slot:tabular-table-header>
      <TableHeaders :columns="columns" />
    </template>

    <template v-slot:tabular-table-table>
  <TabularTableRow 
    v-for="item in displayedItems"
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

import { processData } from '@/api/sendFunctions/postsDowntime';

import TabularTableRow from '@/components/Tabular/TabularTableRow.vue';

import { toggleDetails, formatTotalDowntime, formatCurrency, selectedCarCenterIds, truncateText, unixToData } from '@/utils/Things.js'; // Импорт функций из файла

import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';


const currentSort = ref('itemsByMechanics');
const totalLoss = ref(0);
const itemsByPosts = ref([]);
const itemsByMechanics = ref([]);
const tableData = ref([]);

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
  const initialFilters = { date: 1675623600, period: 'month', works: null };
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



async function fetchCustomerSkipsData({ date, period, workId }) {
  const filters = {
    interval: period,
    dateStart: date,
    works: workId,
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
 tableData.value = processData(columns.value, displayedItems.value, currentSortOption.value.option);
 const kpdPostsDate = `Кпд постов ${unixToData(filterDate.value.date,false,filterPeriod)}`;
 const tableDataContent = tableData.value;
 const mailResponse = await apiClient.post('/report-emails', { title: kpdPostsDate, content: tableDataContent});
 console.log(mailResponse);
}
async function onSendTable(){

const apiClient = isEnv('sadmin') ? sadminApiClient : directorApiClient;
tableData.value = processData(columns.value, displayedItems.value, currentSortOption.value.option);
const kpdPostsDate = `Кпд постов ${unixToData(filterDate.value.date,false,filterPeriod)}`;
const tableDataContent = tableData.value;
const mailResponse = await apiClient.post('/report-save', { title: kpdPostsDate, content: tableDataContent});
console.log(mailResponse);
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



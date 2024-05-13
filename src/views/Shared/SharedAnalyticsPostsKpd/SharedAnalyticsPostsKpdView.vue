<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <MainHeader />
  <MainHeaderGap />
  <DirectorReportComponent
    :show-filter-or="true"
    @filtersApplied="fetchData"
    @worksLoaded="handleAllWorksLoaded"
    @optionSelected="changeOrsOption"
    @dataUpdated="onDataUpdated"
  >
    <template v-slot:tabular-title>
      <TabularPrimeTitle>Кпд постов</TabularPrimeTitle>
    </template>

    <template v-slot:tabular-table-header>
      <TableHeaders :columns="columns" />
    </template>

    <template v-slot:tabular-table-table>
      <!--<TabularTableRow v-for="item in items" :key="item.orderId" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr .2fr;">-->
      <TabularTableRow
      v-for="item in displayedItems"
      :key="item.orderId"
      :item="item"
      style="grid-template-columns: 4fr 3fr 1fr;"
    >
      <!-- Пост Работы Потери Время записи Телефон Автомобиль -->
      <TabularTableRowCell v-if="currentSort.option === 'itemsByPosts'">Пост №{{ item.postNumber }}</TabularTableRowCell>
      <TabularTableRowCell v-else>{{ item.mechanicName }}</TabularTableRowCell>
      <!-- Перебор и отображение работ для каждой строки -->
      <TabularTableRowCell :style="{ height: cellHeight, width: '2fr' }" style="padding-left: 10px;">
      <strong>Все работы</strong>
      <details  class="custom-details" :style="{ width: cellWidth }">
        <summary class="flex" style="justify-content: space-between;">
         <strong></strong>
        </summary>
        <ul>
          <li v-for="work in item.works" :key="work.id">{{ truncateText(work.workName, 50) }}</li>
        </ul>
      </details>
    </TabularTableRowCell>
      <TabularTableRowCell :class="getDeviationClass(item.totalDeviationMinutes)">{{ formatDeviation(item.totalDeviationMinutes) }}
        <details class="custom-details" :style="{ width: cellWidth }">
        <summary class="flex" style="justify-content: space-between;"><strong></strong></summary>
        <ul>
          <li v-for="work in item.works" :key="work.id" :class="getDeviationClass(work.deviationMinutes)">
            {{ formatDeviation(work.deviationMinutes) }}
        </li>
        </ul>
      </details></TabularTableRowCell>
    </TabularTableRow>
    </template>
    
  </DirectorReportComponent>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import DirectorReportComponent from '@/components/directorReportComponent.vue';
import TableHeaders from '@/components/Tabular/TableHeaders.vue';
import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
import TabularTableCellBottom from '@/components/Tabular/TabularTableCellBottom.vue';
import TabularTableRowCell from '@/components/Tabular/TabularTableRowCell.vue';
import TabularTableRow from '@/components/Tabular/TabularTableRow.vue';

import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';

import { unixToDate } from '@/utils/time/dateUtils.js';
import { sadminApiClient } from '@/api/sadminApiClient';
import { directorApiClient } from '@/api/directorApiClient';
import isEnv from '@/utils/isEnv.js';
import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';

import { computed } from 'vue';
//////////
//Вызов констант
//////////
const sadminServiceStationsStore = useSadminServiceStationsStore();
const apiCall = isEnv('sadmin') ? sadminApiClient : directorApiClient;
const url = '/analytics/get-posts-KPD';
const currentSort = ref({ option: 'itemsByMechanics' });

const items = ref([]);
const itemsByPosts = ref([]);
const itemsByMechanics = ref([]);

const columns = ref([]);

const carCenterIds = computed(() => {
      // Замените эту логику на реальный вызов функции isEnv и доступ к sadminServiceStationsStore
      return isEnv('sadmin') 
        ? sadminServiceStationsStore?.getSelectedServiceStation().id
        : "none";
    });
//////////
//
//////////
const initialFilters = { date: 1675623600, period: 'month', works: null };
const filtersRef = ref(initialFilters);
function onDataUpdated(data) {
  // Обновляем значения filtersRef
  filtersRef.value = {
    interval: data.period,
    dateStart: data.dateStart,
    works: Array.isArray(data.workId) ? data.workId : null,
    carCenters: [carCenterIds.value],
    page: 1
  };
}

// Initialize columns
onMounted(() => {
    changeOrsOption(currentSort.value.option);
});

function changeOrsOption(option) {
    currentSort.value.option = option;
    columns.value = [
        { header: option === 'itemsByPosts' ? 'Пост' : 'Механик', size: '4fr' },
        { header: 'Работы', size: '3fr' },
        { header: 'Потери', size: '1fr' },
    ];
}




function handleAllWorksLoaded(ids) {
    console.log("==============");
    console.log(ids);
    console.log("==============");
    const { dateStart, period, workId } = ids;
    fetchData({ date: dateStart, period, workId });
  }
onMounted(() => {
  fetchData(initialFilters);
});

watch(() => currentSort.value.option, (newVal) => {
    changeOrsOption(newVal);
});


  

// Обновление колонок в зависимости от currentSort
const getTotalLossSum = (items) => {
  // Инициализация переменной для хранения суммы
  let totalLossSum = 0;
  // Перебор всех элементов массива items
  items.forEach((item) => {
    // Добавление totalLoss каждого элемента к общей сумме
    totalLossSum += item.totalLoss;
  });
  // Возврат общей суммы
  return totalLossSum;
};
function formatTotalLoss (sum) {
  // Добавление отступов
  let formattedTotalLoss = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(sum);
  return formattedTotalLoss;
};



///////  Тут находится код, который убирает баг с раскрытием строк
//////   при нажатии на тэг summary в некоторых браузерах (возможно во всех)
/////    Он ужасен и требует доработки или фикса самого бага, но Хот фикс есть Хот фикс
function closeAllDetails(detailsElements) {
  detailsElements.forEach((details) => {
    details.removeAttribute('open');
  });
}

// Функция для открытия всех элементов details
function openAllDetails(detailsElements) {
  detailsElements.forEach((details) => {
    details.setAttribute('open', true);
  });
}
function countDetailsStatus(detailsElements) {
  let openCount = 0;
  let closedCount = 0;

  detailsElements.forEach((details) => {
    if (details.open) {
      openCount++;
    } else {
      closedCount++;
    }
  });

  return { openCount, closedCount };
}
// Основная функция для переключения состояния элементов details
function toggleDetails(event) {
  console.log('toggleSingleDetail вызван');

  // Получаем все элементы `details` внутри текущего TabularTableRow.
  const detailsElements = event.currentTarget.querySelectorAll('details');
  console.log(`Найдено ${detailsElements.length} элементов 'details'`);

  // Подсчитываем количество открытых и закрытых элементов details
  const { openCount, closedCount } = countDetailsStatus(detailsElements);

  if (openCount > closedCount) {
    console.log('Закрываем все элементы `details`');
    // Закрываем все элементы details через 100 миллисекунд
    setTimeout(() => {
      closeAllDetails(detailsElements);
    }, 10);
  } else {
    console.log('Открываем все элементы `details`');
    // Открываем все элементы details через 100 миллисекунд
    setTimeout(() => {
      openAllDetails(detailsElements);
    }, 90);
  }

  // Добавляем небольшую задержку перед проверкой состояний, чтобы изменения успели примениться
  setTimeout(() => {
    detailsElements.forEach((details, index) => {
      if (details.open) {
        console.log(`Элемент details[${index}] остался открытым после обработки`);
      } else {
        console.log(`Элемент details[${index}] закрыт после обработки`);
      }
    });
  }, 100); // Увеличил время задержки, чтобы учесть также задержку на закрытие/открытие
}
//\\\
//\\\\
//\\\\\

function toggleSingleDetail(event) {toggleDetails(event)}
const displayedItems = computed(() => {
  return currentSort.value.option === 'itemsByPosts' ? itemsByPosts.value : itemsByMechanics.value;
});
async function fetchData({ date, period, workId }) {
  const works = Array.isArray(workId) ? workId : null;
  filtersRef.value = ref({
    interval: period,
    dateStart: date,
    works: works,
    carCenters: [carCenterIds.value], // Указаны для примера, измените по необходимости
    page: 1 // Указано для примера, измените по необходимости
  });

  try {
    const response = await apiCall.post(url, { filters: filtersRef.value });
    //console.log(response.data[currentSort.value][0].works);
    itemsByPosts.value = response.data.itemsByPosts;
    itemsByMechanics.value = response.data.itemsByMechanics;
    console.log(itemsByPosts.value);
    console.log(itemsByMechanics.value);
    //updateColumns(currentSort.value);
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    return null;
  }
}
async function fetchDataAndDoSomething() {
}

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}
function getDeviationClass(value) {
  return {
    'text-green': value < 0,
    'text-red': value > 0
  };
}

function formatDeviation(value) {
  if (value > 0) {
    return `+${value}`;
  }
  return value.toString();
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


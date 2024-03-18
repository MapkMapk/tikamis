<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <MainHeader />
  <MainHeaderGap />
  <DirectorReportComponent
    :show-filter-or="true"
    @filtersApplied="fetchCustomerSkipsData"
    @optionSelected="changeOrsOption"
  >
    <template v-slot:tabular-title>
      <TabularPrimeTitle>Дополнительные работы</TabularPrimeTitle>
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
      @click="toggleDetails($event)"
      style="grid-template-columns: 4fr 3fr 1fr;"
    >
      
      <!-- Пост Работы Потери Время записи Телефон Автомобиль -->
      <TabularTableRowCell v-if="currentSort.option === 'itemsByPosts'">Пост №{{ item.postNumber }}</TabularTableRowCell>
      <TabularTableRowCell v-else>{{ item.mechanicName }}</TabularTableRowCell>
      <!-- Перебор и отображение работ для каждой строки -->
      <TabularTableRowCell :style="{ height: cellHeight, width: '2fr' }" style="padding-left: 10px;">
      <strong>Все работы</strong>
      <details  class="custom-details" :style="{ width: cellWidth }">
        <summary class="flex" style="justify-content: space-between;" @click.stop="toggleSingleDetail($event)">
         <strong></strong>
        </summary>
        <ul>
          <li v-for="work in item.works" :key="work.id">{{ truncateText(work.workName, 50) }}</li>
        </ul>
      </details>
    </TabularTableRowCell>
      <TabularTableRowCell>{{ formatTotalLoss(item.totalLoss) }}
        <details  class="custom-details" :style="{ width: cellWidth }">
        <summary class="flex" style="justify-content: space-between;" @click.stop="toggleSingleDetail($event)"><strong></strong></summary>
        <ul>
          <li v-for="work in item.works" :key="work.id">
          {{ formatTotalLoss(work.loss) }}
        </li>
        </ul>
      </details></TabularTableRowCell>
    </TabularTableRow>
    <TabularTableCellBottom style="display: flex; justify-content: space-around;"><p style="color: white">Итого потерь:</p><p style="color: white">{{ formatTotalLoss(getTotalLossSum(items)) }}</p></TabularTableCellBottom>
    </template>
    
  </DirectorReportComponent>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue';
import DirectorReportComponent from '@/components/directorReportComponent.vue';
import TableHeaders from '@/components/Tabular/TableHeaders.vue';
import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
import TabularTableCellBottom from '@/components/Tabular/TabularTableCellBottom.vue';
import TabularTableRowCell from '@/components/Tabular/TabularTableRowCell.vue';
import { directorApiClient } from '@/api/directorApiClient';
import TabularTableRow from '@/components/Tabular/TabularTableRow.vue';

import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';


const items = ref([]);
const itemsByPosts = ref([]);
const itemsByMechanics = ref([]);
const currentSort = ref('itemsByMechanics');
function changeOrsOption(option){
  currentSort.value = option;
  console.warn(displayedItems.value.length);
  if (currentSort.value.option === 'itemsByPosts') {
    columns.value = [
      { header: 'Пост', size: '4fr' },
      { header: 'Работы', size: '3fr' },
      { header: 'Потери', size: '1fr' },
    ];
  } else {
    // Предполагаемая структура колонок для "mechanics"
    columns.value = [
      { header: 'Механик', size: '4fr' },
      { header: 'Работы', size: '3fr' },
      { header: 'Потери', size: '1fr' },
    ];
  }
}


onMounted(() => {
  // Предположим, что у вас есть начальные значения для фильтров
  const initialFilters = { date: 1675623600, period: 'month', works: null };
  fetchCustomerSkipsData(initialFilters);
  console.log('ВНИМАНИЕ, ЭТО ТЕСТОВАЯ СТРАНИЦА, ОНА ВЫВОДИТ ИНФОРМАЦИЮ ИЗ report/get-customer-skips');
});
// Обновление колонок в зависимости от currentSort
const columns = ref([]);

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

watch(currentSort.value.option, (newVal) => {
  if (newVal === 'itemsByPosts') {
    columns.value = [
      { header: 'Пост', size: '4fr' },
      { header: 'Работы', size: '3fr' },
      { header: 'Потери', size: '1fr' },
    ];
  } else {
    // Предполагаемая структура колонок для "mechanics"
    columns.value = [
    { header: 'Механик', size: '4fr' },
      { header: 'Работы', size: '3fr' },
      { header: 'Потери', size: '1fr' },
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

function toggleDetails(event) {
  // Проверяем, что клик был не по самому элементу <summary>,
  // чтобы избежать конфликта с его стандартным поведением.
  if (event.target.tagName !== 'SUMMARY') {
    const detailsElements = event.currentTarget.querySelectorAll('details');
    detailsElements.forEach(details => {
      // Если details уже открыт, закрываем его, и наоборот.
      if (details.hasAttribute('open')) {
        details.removeAttribute('open');
      } else {
        details.setAttribute('open', '');
      }
    });
  }
}
function toggleSingleDetail(event) {toggleDetails(event)}

const displayedItems = computed(() => {
  return currentSort.value.option === 'itemsByPosts' ? itemsByPosts.value : itemsByMechanics.value;
});


async function fetchCustomerSkipsData({ date, period, workId }) {
  const filters = {
    interval: period,
    dateStart: date,
    works: Array.isArray(workId) ? workId : [workId],
    carCenters: ['C-1111'], // Указаны для примера, измените по необходимости
    page: 1 // Указано для примера, измените по необходимости
  };

  try {
    const response = await directorApiClient.post('/report/get-customer-skips', { filters });
    //console.log(response.data[currentSort.value][0].works);
    itemsByPosts.value = response.data.itemsByPosts;
    itemsByMechanics.value = response.data.itemsByMechanics;
    console.log(items.value);
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


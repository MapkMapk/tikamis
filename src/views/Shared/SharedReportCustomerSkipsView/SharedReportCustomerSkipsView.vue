<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <MainHeader />
  <MainHeaderGap />
  <DirectorReportComponent
    :show-filter-or="false"
    @filtersApplied="fetchCustomerSkipsData"
  >
    <template v-slot:tabular-title>
      <TabularPrimeTitle>Не приехавшие клиенты</TabularPrimeTitle>
    </template>

    <template v-slot:tabular-table-header>
      <TableHeaders :columns="columns" />
    </template>

    <template v-slot:tabular-table-table>
      <!--<TabularTableRow v-for="item in items" :key="item.orderId" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr .2fr;">-->
      <TabularTableRow
      v-for="item in items"
      :key="item.orderId"
      :item="item"
      @click.stop="toggleSingleDetail($event)"
      style="grid-template-columns: 2fr 4fr 1fr 2fr 2fr 2fr;"
    >
      <template v-if="currentSort === 'itemsByPosts'">
      <!-- Пост Работы Потери Время записи Телефон Автомобиль -->
      <TabularTableRowCell>Пост №{{ item.postNumber }}</TabularTableRowCell>
      <!-- Перебор и отображение работ для каждой строки -->
      <TabularTableRowCell :style="{ height: cellHeight, width: '2fr' }" style="padding-left: 10px;" >
      <p style="opacity: 0;">dsfdsfdsfsdsfsdfsd</p>
      <details  class="custom-details" :style="{ width: cellWidth }">
        <summary class="flex" style="justify-content: space-between;">
         <strong></strong>
        </summary>
        <ul>
          <li v-for="work in item.works" :key="work.id">{{ truncateText(work.workName, 50) }}</li>
        </ul>
      </details>
    </TabularTableRowCell>
      <TabularTableRowCell>{{ formatTotalLoss(item.totalLoss) }}
        <details  class="custom-details" :style="{ width: cellWidth }">
        <summary class="flex" style="justify-content: space-between;"><strong></strong></summary>
        <ul>
          <li v-for="work in item.works" :key="work.id">
          {{ work.loss }}
        </li>
        </ul>
      </details></TabularTableRowCell>
      <TabularTableRowCell><p style="opacity: 0;">dsfdsfdsfsdsfsdfsd</p>
        <details  class="custom-details" :style="{ width: cellWidth }">
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
        <details  class="custom-details" :style="{ width: cellWidth }">
        <summary class="flex" style="justify-content: space-between;" ><strong>Клиенты ({{ item.works.length }})</strong></summary>
        <ul>
          <li v-for="work in item.works" :key="work.id">
          {{ work.phone }}
        </li>
        </ul>
      </details>
        </TabularTableRowCell>
        <TabularTableRowCell><p style="opacity: 0;">dsfdsfdsfsdsfsdfsd</p>
        <details  class="custom-details" :style="{ width: cellWidth }">
        <summary class="flex" style="justify-content: space-between;" ><strong></strong></summary>
        <ul>
          <li v-for="work in item.works" :key="work.id">
          {{ work.plate }}
        </li>
        </ul>
      </details>
        </TabularTableRowCell>
      </template>
    </TabularTableRow>
    </template>
  </DirectorReportComponent>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import DirectorReportComponent from '@/components/directorReportComponent.vue';
import TableHeaders from '@/components/Tabular/TableHeaders.vue';
import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
import TabularTableRowCell from '@/components/Tabular/TabularTableRowCell.vue';
import { directorApiClient } from '@/api/directorApiClient';
import TabularTableRow from '@/components/Tabular/TabularTableRow.vue';

import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';


const items = ref([]);
const currentSort = ref('itemsByPosts');

function formatTotalLoss (sum) {
  // Добавление отступов
  let formattedTotalLoss = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(sum);
  return formattedTotalLoss;
};

onMounted(() => {
  // Предположим, что у вас есть начальные значения для фильтров
  const initialFilters = { date: 1675623600, period: 'month', works: null };
  fetchCustomerSkipsData(initialFilters);
  console.log(items.value);
});
// Обновление колонок в зависимости от currentSort
const columns = ref([]);

watch(currentSort, (newVal) => {
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
      { header: 'Центр', size: '3fr' },
      { header: 'Клиенты', size: '1fr' },
      { header: 'Убытки', size: '1fr' },
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
    }, 10);
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
  }, 20); // Увеличил время задержки, чтобы учесть также задержку на закрытие/открытие
}
//\\\
//\\\\
//\\\\\


function toggleSingleDetail(event) {toggleDetails(event)}
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
    items.value = response.data[currentSort.value];
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

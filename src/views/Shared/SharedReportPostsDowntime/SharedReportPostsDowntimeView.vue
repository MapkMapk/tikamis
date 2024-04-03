<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <MainHeader />
  <MainHeaderGap />
  <DirectorReportComponent
    :show-filter-or="true"
    @filtersApplied="fetchCustomerSkipsData"
    @optionSelected="changeOrsOption"
    @worksLoaded="handleAllWorksLoaded"
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
    @click="toggleDetails($event)" 
    style="grid-template-columns: 4fr 2fr 1fr;">
    <!-- Условное отображение номера поста или имени механика -->
    <TabularTableRowCell v-if="currentSort.option === 'itemsByPosts'">Пост №{{ item.postNumber }}</TabularTableRowCell>
    <TabularTableRowCell v-else>{{ item.mechanicName }}</TabularTableRowCell>
    <!-- Перебор и отображение работ для каждой строки -->
    <TabularTableRowCell :style="{width: '2fr'}" style="padding-left: 10px;">
      <strong>{{ item.totalDowntime }}</strong>
      <details class="custom-details">
        <summary class="flex" style="justify-content: space-between;" @click.stop="toggleSingleDetail($event)">
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
          <i class="material-icons" @click="toggleDetails(item.orderId)">
            {{ item.detailsOpen ? 'expand_less' : 'expand_more' }}
          </i>
        </div></div>
        <details :open="item.detailsOpen" @toggle="item.detailsOpen = !item.detailsOpen" class="custom-details" :style="{ width: cellWidth }">
        <summary class="flex" style="justify-content: space-between;" @click.stop="toggleSingleDetail($event)">
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
import DirectorReportComponent from '@/components/directorReportComponent.vue';
import TableHeaders from '@/components/Tabular/TableHeaders.vue';
import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
import TabularTableCellBottom from '@/components/Tabular/TabularTableCellBottom.vue';
import TabularTableRowCell from '@/components/Tabular/TabularTableRowCell.vue';
import { directorApiClient } from '@/api/directorApiClient';
import TabularTableRow from '@/components/Tabular/TabularTableRow.vue';

import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';

const totalLoss = ref(0);
const itemsByPosts = ref([]);
const itemsByMechanics = ref([]);
const currentSort = ref('itemsByMechanics');
function changeOrsOption(option){
  currentSort.value = option;
  console.warn(displayedItems.value.length);
  if (currentSort.value.option === 'itemsByPosts') {
    columns.value = [
      { header: 'Пост', size: '4fr' },
      { header: 'Время простоя, мин', size: '1fr' },
      { header: 'Дата', size: '1fr' },
    ];
  } else {
    // Предполагаемая структура колонок для "mechanics"
    columns.value = [
      { header: 'Механик', size: '4fr' },
      { header: 'Время простоя, мин', size: '1fr' },
      { header: 'Дата', size: '1fr' },
    ];
  }
}
onMounted(async () => {
  const initialFilters = { date: 1675623600, period: 'month', works: null };
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

// const getTotalLossSum = (items) => {
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
function formatTotalLoss (sum) {
  // Добавление отступов
  let formattedTotalLoss = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(sum);
  return formattedTotalLoss;
};
function formatTotalDowntime (dt){
  let lastNum = dt%10;
  let minut = "минут";
  if (lastNum==1){return `${dt}  минута`;}
  if (lastNum == 2 || lastNum == 3 || lastNum == 4){return `${dt}  минуты`;}
  return `${dt}  минут`;
}

watch(currentSort.value.option, (newVal) => {
  if (newVal === 'itemsByPosts') {
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
    const response = await directorApiClient.post('/report/get-posts-downtime', { filters });
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



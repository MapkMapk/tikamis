<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <MainHeader />
  <MainHeaderGap />
  <DirectorReportComponent
    class=""
    @optionSelected="updateSortOption"
    :is-filter-or-visible="false"
    :is-filter-all-works-visible="false"
    :are-buttons-visible="false"
    @filtersApplied="fetchData"
    @filtersReset="fetchData"
  >
    <!-- <template v-slot:tabular-title> -->
    <template v-slot:tabular-title>
      <TabularPrimeTitle>Отзывы {{ unixToDatePeriodHeader(filterDateStart, filterPeriod) }}</TabularPrimeTitle>
    </template>
    <!-- <template v-slot:tabular-table-header> -->
    <template v-slot:tabular-table-header>
      <TableHeaders :columns="columns"  class="fat-boy" />
    </template>

    <template v-slot:tabular-table-table>
      <!--<TabularTableRow v-for="item in items" :key="item.orderId" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr .2fr;">-->
      <TabularTableRow
      v-for="(item, index) in items"
      v-if="items.length"
      :key="index"
      :item="item"
      @click="toggleDetails($event)"
    >
      <template style="display: grid;grid-template-columns: 3fr 1fr 2fr 2fr 2fr;" ><!--v-if="sortOption === 'itemsByMechanics'"-->
        <TabularTableRowCell v-if="item.type == '1'">{{ item.smileContent }} </TabularTableRowCell>
        <TabularTableRowCell v-if="item.type == '2'">{{ item.textContent }} </TabularTableRowCell>
        <TabularTableRowCell v-if="item.type == '4'">
          <audio controls="" :src="`data:audio/mp3;base64,${item.voiceContent}`"></audio>
        </TabularTableRowCell>
      <!-- Пост Работы Потери Время записи Телефон Автомобиль -->
      <TabularTableRowCell>{{ item.tone }}</TabularTableRowCell>
      <TabularTableRowCell>{{ unixToDate(item.date) }}</TabularTableRowCell>
      <!-- Перебор и отображение работ для каждой строки -->
      <TabularTableRowCell>{{ item.phoneNumber }}</TabularTableRowCell>
      
      <TabularTableRowCell>{{ item.plate }}</TabularTableRowCell>
        
      </template>
    </TabularTableRow>
    <TabularTableRow v-else class="h-[50vh]">
				<FiltersNoData></FiltersNoData>
			</TabularTableRow>
    </template>

  </DirectorReportComponent>
  <div class="flex flex-col items-center" v-if="items.length">
            <div id="234" class="w-full flex mt-10 mb-3" style="justify-content: center">
              <div style="width: 400px;margin-right: 20px;"  @click="saveData">
              <AdvButtonFilledGreen ></AdvButtonFilledGreen>
            </div>
            <div style="width: 400px;margin-left: 20px" @click="sendData">
              <AdvButtonFilledDark  style="padding-bottom: 0.75rem !important"></AdvButtonFilledDark>
            </div>
            </div>
          </div>
</template>

<script setup>
  import AdvButtonFilledGreen from '@/components/AdvButtonFilledGreen.vue';
  import FiltersNoData from '@/components/Tabular/FiltersNoData.vue';
  import AdvButtonFilledDark from '@/components/AdvButtonFilledDark.vue';
  import { unixToDatePeriodHeader, getUnixToday } from '@/utils/time/dateUtils.js';
import { onMounted, ref, watch } from 'vue';
import DirectorReportComponent from '@/components/DirectorReportComponent.vue';
import TableHeaders from '@/components/Tabular/TableHeaders.vue';
import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
import TabularTableRowCell from '@/components/Tabular/TabularTableRowCell.vue';
import TabularTableRow from '@/components/Tabular/TabularTableRow.vue';

import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';
import { convertToTableFormat }  from '@/api/sendFunctions/reviews.js'
//////////
//оч важный блок
//////////
import isEnv from '@/utils/isEnv.js';
import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';
import { sadminApiClient } from '@/api/sadminApiClient';
import { directorApiClient } from '@/api/directorApiClient';
import { computed } from 'vue';
const serviceStationsStore = useSadminServiceStationsStore();
const apiClient = isEnv('sadmin') ? sadminApiClient : directorApiClient;

const selectedCarCenterIds = computed(() => {
      // Замените эту логику на реальный вызов функции isEnv и доступ к serviceStationsStore
      return isEnv('sadmin') 
        ? [serviceStationsStore?.getSelectedServiceStation().id]
        : null;
    });
//////////
//
//////////
const filterDateStart = ref(getUnixToday());
const filterPeriod = ref('month');
const isPlaying = ref(false);
const items = ref([]);
const sortOption = ref('itemsByMechanics');

function formatCurrency (sum) {
  // Добавление отступов
  let formattedTotalLoss = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(sum);
  return formattedTotalLoss;
};

onMounted(() => {
  // Предположим, что у вас есть начальные значения для фильтров
  // const initialFilters = { date: 1675623600, period: 'month', works: null };
  // fetchData(initialFilters.date, initialFilters.period, initialFilters.workId);
  // console.log(initialFilters.date);
});
// Обновление колонок в зависимости от sortOption
const columns = ref([]);

onMounted(() => {
    updateSortOption(sortOption.value.option);
});

function updateSortOption(option) {
    sortOption.value = option;
    columns.value = [
        { header: option === 'itemsByPosts' ? 'Пост' : 'Механик', size: '4fr' },
        { header: 'Работы', size: '3fr' },
        { header: 'Потери', size: '1fr' },
    ];
}
watch(sortOption, (newVal) => {
  console.log("Текущая сортировка:", newVal);
  if (newVal === 'itemsByPosts') {
    columns.value = [
      { header: 'Отзыв', size: '3fr' },
      { header: 'Тон отзыва', size: '1fr' },
      { header: 'Дата', size: '2fr' },
      { header: 'Телефон', size: '2fr' },
      { header: 'Автомобиль', size: '2fr' },
    ];
  } else {
    // Предполагаемая структура колонок для "mechanics"
    columns.value = [
      { header: 'Отзыв', size: '3fr' },
      { header: 'Тон отзыва', size: '1fr' },
      { header: 'Дата', size: '2fr' },
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
async function fetchData({ date, period }) {
  filterDateStart.value = {date}.date;
  filterPeriod.value = {period}.period;
  const filters = {
    interval: period,
    dateStart: date,
    //works: Array.isArray(workId) ? workId : [workId],
    works: null,
    carCenters: selectedCarCenterIds.value,
    page: 1
  };

  try {
    const response = await apiClient.post('/analytics/get-reviews', { filters });
    items.value = response.data.items;
    console.log('айтемы');
    console.log(items.value);
    console.log('айтемы');
    //updateColumns(sortOption.value);
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
}
//обрезание текста
function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}
async function saveData(){
  const tableData = convertToTableFormat(
    `Отзывы ${ unixToDatePeriodHeader(filterDateStart.value, filterPeriod.value)}`,
    columns.value,
    items.value
  );
  const saveResponse = await apiClient.post('/report-save',tableData);
  console.log(saveResponse);
}
async function sendData(){
  const tableData = convertToTableFormat(
    `Отзывы ${ unixToDatePeriodHeader(filterDateStart.value, filterPeriod.value)}`,
    columns.value,
    items.value
  );
  const mailResponse = await apiClient.post('/report-emails',tableData);
  console.log(mailResponse);
}
</script>
<script>
export default {
  setup() {
    const isPlaying = ref(false);
    const progress = ref(0);
    let intervalId = null;
    const waves = ref([]);

    const togglePlay = () => {
      isPlaying.value = !isPlaying.value;

      if (isPlaying.value) {
        intervalId = setInterval(() => {
          if (progress.value < 100) {
            progress.value += 1;
          } else {
            clearInterval(intervalId);
            isPlaying.value = false;
            progress.value = 0; // Сбросить прогресс, когда сообщение закончилось
          }
        }, 100); // Обновлять прогресс каждые 100 мс
      } else if (intervalId) {
        clearInterval(intervalId);
      }
    };
    onMounted(() => {
      // Для каждой из 32 волн создаем случайную задержку
      waves.value = Array.from({ length: 32 }, () => ({
        animationDelay: `${Math.random() * -2}s` // Задержка от 0 до -2 секунд
      }));
    });

    return { isPlaying, progress, togglePlay, waves  };
  },
};
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
.fat-boy {
  overflow-x: auto; /* Добавляет горизонтальный скроллбар при необходимости */
}



.voice-message {
  display: flex;
  align-items: center;
  color: orange;
}

.play-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid orange;
  background-color: transparent;
  color: orange;
  cursor: pointer;
}

.audio-waves {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 10px;
}
.audio-waves-low{
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 10px 0 4px;
  color: #A3A4A6;}
.wave {
  display: block;
  width: 3px;
  height: 10px;
  background-color: orange;
  animation: wave-animation 1.5s infinite ease-in-out;
}
.wave-low {
  display: block;
  width: 3px;
  height: 10px;
  background-color: #A3A4A6;
  animation: wave-animation 1.5s infinite ease-in-out;
}

.wave:nth-child(2) {
  animation-delay: -1.2s;
}

.wave:nth-child(3) {
  animation-delay: -0.9s;
}

@keyframes wave-animation {
  0%, 100% {
    transform: scaleY(0.4);
  }
  10% {
    transform: scaleY(1.5);
  }
  30% {
    transform: scaleY(0.6);
  }
  50% {
    transform: scaleY(2);
  }
  70% {
    transform: scaleY(0.8);
  }
  90% {
    transform: scaleY(1.2);
  }
}

.time {
  font-size: 14px;
  color: orange;
}
.tabletabletabletable{
width: 2000px;}
.jjjj{overflow-y: hidden;}
</style>
<style>

</style>
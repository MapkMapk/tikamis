<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <MainHeader />
  <MainHeaderGap />
  
  <DirectorReportComponent
    class=""
    :show-filter-or="false"
    :show-Filter-All-Works="false"
    :show-Buttons="false"
    @filtersApplied="fetchCustomerSkipsData"
  >
    <template v-slot:tabular-title>
      <TabularPrimeTitle>Отзывы</TabularPrimeTitle>
    </template>
    <template v-slot:tabular-table-header>
      <TableHeaders :columns="columns"  class="fat-boy" />
    </template>

    <template v-slot:tabular-table-table>
      <!--<TabularTableRow v-for="item in items" :key="item.orderId" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr .2fr;">-->
      <TabularTableRow
      v-for="item in items"
      :key="item.orderId"
      :item="item"
      @click="toggleDetails($event)"
    >
      <template style="display: grid;grid-template-columns: 3fr 1fr 2fr 2fr 2fr;" ><!--v-if="currentSort === 'itemsByMechanics'"-->
        <TabularTableRowCell v-if="item.type == '1'">{{ item.smileContent }} </TabularTableRowCell>
        <TabularTableRowCell v-if="item.type == '2'">{{ item.textContent }} </TabularTableRowCell>
        <TabularTableRowCell v-if="item.type == '4'">
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          <div class="voice-message">
            <button class="play-button" @click="togglePlay">
              <span class="material-icons" v-if="!isPlaying">play_arrow</span>
              <span class="material-icons" v-if="isPlaying">pause</span>
            </button>
            <div class="audio-waves">
              <span v-for="n in 24" :key="`high-${n}`" class="wave" :style="{ animationDelay: `${Math.random() * -2}s` }"></span>
              <span v-for="n in 8" :key="`low-${n}`" class="wave-low" :style="{ animationDelay: `${Math.random() * -1}s` }"></span>

            </div>
            <div >0:05</div>
          </div>
        </TabularTableRowCell>
      <!-- Пост Работы Потери Время записи Телефон Автомобиль -->
      <TabularTableRowCell>{{ item.tone }}</TabularTableRowCell>
      <TabularTableRowCell>{{ unixToDate(item.date) }}</TabularTableRowCell>
      <!-- Перебор и отображение работ для каждой строки -->
      <TabularTableRowCell>{{ item.phoneNumber }}</TabularTableRowCell>
      
      <TabularTableRowCell>{{ item.plate }}</TabularTableRowCell>
        
      </template>
    </TabularTableRow>
    </template>

  </DirectorReportComponent>
  <div class="flex flex-col items-center">
            <div id="234" class="w-full flex mt-10 mb-3" style="justify-content: center">
              <div style="width: 400px;margin-right: 20px;">
              <BaseButtonFilledGreen
                class="flex justify-between flex-1 mr-5 pt-3 pb-3"
                style="width: inherit;"
                >
                
                <div class="">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="48px" height="48px" viewBox="0 0 96 96" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g><path style="opacity:0.998" fill="#e7f4e8" d="M 15.5,5.5 C 30.5037,5.33342 45.5037,5.50008 60.5,6C 66.6667,12.1667 72.8333,18.3333 79,24.5C 79.5,46.1641 79.6666,67.8308 79.5,89.5C 58.1667,89.5 36.8333,89.5 15.5,89.5C 15.5,61.5 15.5,33.5 15.5,5.5 Z"/></g>
                <g><path style="opacity:1" fill="#fdfefe" d="M 57.5,8.5 C 63.9648,14.4639 70.2981,20.6306 76.5,27C 70.1754,27.4995 63.8421,27.6662 57.5,27.5C 57.5,21.1667 57.5,14.8333 57.5,8.5 Z"/></g>
                <g><path style="opacity:1" fill="#409243" d="M 36.5,43.5 C 38.5273,43.3379 40.5273,43.5045 42.5,44C 43.8742,46.5829 45.3742,49.0829 47,51.5C 48.6258,49.0829 50.1258,46.5829 51.5,44C 53.5787,43.1923 55.5787,43.359 57.5,44.5C 55.4819,48.5363 53.4819,52.5363 51.5,56.5C 53.4367,60.8719 55.77,65.0385 58.5,69C 56.1667,69.6667 53.8333,69.6667 51.5,69C 50.1258,66.4171 48.6258,63.9171 47,61.5C 45.3742,63.9171 43.8742,66.4171 42.5,69C 40.1667,69.6667 37.8333,69.6667 35.5,69C 38.23,65.0385 40.5633,60.8719 42.5,56.5C 40.2115,52.259 38.2115,47.9256 36.5,43.5 Z"/></g>
                </svg></div>
                <div class="flex items-center">Выбрать</div>
                <div class="w-[48px] h-[48px]"></div>
                </BaseButtonFilledGreen
              >
            </div>
            <div style="width: 400px;margin-left: 20px">
              <BaseButtonFilledDark
                class="flex flex-1 justify-between pt-3 pb-3"
                style="width: inherit;"
                >
                <div class="w-[48px] h-[48px]"></div>
                <div class="flex items-center text-white">Отправить</div>
                <div><svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 100.000000 100.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,100.000000) scale(0.100000,-0.100000)" fill="#ffffff" stroke="none"> <path d="M60 540 l0 -320 230 0 c223 0 230 1 230 20 0 19 -7 20 -210 20 -264 0 -263 -2 -84 140 69 55 129 100 133 100 4 0 18 -12 32 -26 13 -15 42 -35 65 -45 66 -30 92 -17 278 146 l166 145 0 -173 c0 -161 1 -175 20 -192 20 -18 20 -17 20 243 l0 262 -440 0 -440 0 0 -320z m840 257 c0 -18 -41 -59 -171 -173 -175 -153 -214 -179 -248 -166 -11 4 -97 75 -192 157 -94 83 -176 152 -180 153 -5 2 -9 15 -9 28 l0 24 400 0 400 0 0 -23z m-672 -181 c51 -44 92 -82 92 -85 0 -7 -206 -171 -214 -171 -3 0 -6 81 -6 181 0 172 1 180 18 167 10 -7 59 -49 110 -92z"/><path d="M764 389 c-3 -6 20 -37 52 -70 l58 -59 -137 0 c-130 0 -137 -1 -137 -20 0 -19 7 -20 137 -20 l137 0 -59 -60 c-47 -47 -57 -62 -47 -72 10 -10 30 5 95 70 l82 82 -80 80 c-44 44 -83 80 -87 80 -4 0 -10 -5 -14 -11z"/></g></svg></div>
          </BaseButtonFilledDark>
            </div>
            </div>
          </div>
</template>

<script setup>
  import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
  import BaseButtonFilledDark from '@/components/BaseButtonFilledDark.vue';

import { onMounted, ref, watch } from 'vue';
import DirectorReportComponent from '@/components/directorReportComponent.vue';
import TableHeaders from '@/components/Tabular/TableHeaders.vue';
import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
import TabularTableRowCell from '@/components/Tabular/TabularTableRowCell.vue';
import TabularTableRow from '@/components/Tabular/TabularTableRow.vue';

import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';

//////////
//оч важный блок
//////////
import isEnv from '@/utils/isEnv.js';
import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';
import { sadminApiClient } from '@/api/sadminApiClient';
import { directorApiClient } from '@/api/directorApiClient';
import { computed } from 'vue';
const sadminServiceStationsStore = useSadminServiceStationsStore();
const apiCall = isEnv('sadmin') ? sadminApiClient : directorApiClient;

const carCenterIds = computed(() => {
      // Замените эту логику на реальный вызов функции isEnv и доступ к sadminServiceStationsStore
      return isEnv('sadmin') 
        ? [sadminServiceStationsStore?.getSelectedServiceStation().id]
        : ["none"];
    });
//////////
//
//////////

const isPlaying = ref(false);
const items = ref([]);
const currentSort = ref('itemsByMechanics');

function formatTotalLoss (sum) {
  // Добавление отступов
  let formattedTotalLoss = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(sum);
  return formattedTotalLoss;
};

onMounted(() => {
  // Предположим, что у вас есть начальные значения для фильтров
  // const initialFilters = { date: 1675623600, period: 'month', works: null };
  // fetchCustomerSkipsData(initialFilters.date, initialFilters.period, initialFilters.workId);
  // console.log(initialFilters.date);
});
// Обновление колонок в зависимости от currentSort
const columns = ref([]);

watch(currentSort, (newVal) => {
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
function toggleSingleDetail(event) {toggleDetails(event)}

async function fetchCustomerSkipsData({ date, period }) {
  const filters = {
    interval: period,
    dateStart: date,
    //works: Array.isArray(workId) ? workId : [workId],
    works: ['nope'],
    carCenters: carCenterIds.value,
    page: 1
  };

  try {
    const response = await apiCall.post('/analytics/get-reviews', { filters });
    items.value = response.data.items;
    console.log(items.value);
    //updateColumns(currentSort.value);
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
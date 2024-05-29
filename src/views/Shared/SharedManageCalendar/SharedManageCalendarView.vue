<template>
  <ModalBooleanGray
  @callback="grayClose"
  :is-visible="gray.isVisible"
  :main-title="gray.mainTitle"
    :main-text="gray.mainText"
    :primary-button-text="gray.primaryButtonText"
  />
  <ModalBoolean
    @updateData="handleUpdateData"
    @callback="modal.callback"
    :day="modal.day"
    :is-weekend="modal.isWeekend"
    :is-visible="modal.isVisible"
    :primary-button-component="modal.buttonComponent"
    :primary-count-text="modal.primaryCountText"
    :primary-max-number="postLim"
    :main-title="modal.mainTitle"
    :main-text="modal.mainText"
    :primary-button-text="modal.primaryButtonText"
    :secondary-button-text="modal.secondaryButtonText"
  />
  <div>
    
    <MainHeader />
    <MainHeaderGap />
<!--были ли изменения-->
<!--можно ли изменить-->
 <!-- "wereChanges": true, = /* значение, указывающее были ли изменения */; 
 "canChange": true, = /* значение, указывающее можно ли изменить */; 
 "isWeekend": true = /* значение, указывающее стоит ли выходной */; -->
<!--стоит ли выходной-->
    <TabularSection>
      <div class="flex w-full" style="align-items: center; justify-content: center; margin-bottom: 40px;">
      <TabularPrimeTitle class="mb-2">Календарь рабочих смен</TabularPrimeTitle>
      <TabularFilterMonth class="text-4xl flex-none w-[300px] font-medium text-center mt-[39px] mb-[26px] mb-2" 
        style="
        border: 1px solid #A1A4AD;
        padding: 0 10px;
        margin-left: 10px;
      "
      @updateDate="selectDateHandler">
      </TabularFilterMonth>
      <!-- <TabularFilterDate @updateDate="handleSelectedDateFirst" style="flex: 307;"/> -->
      </div>
      <div id="nusdfdsfll" class="flex flex-1 relative w-full" style="align-items: center;">
        <div 
          v-for="day in ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']" 
          :key="day" 
          class="empty-cell flex-half border border-gray-d9d9d9 nusdfdsfll" 
          :style="{ width: '14.285%', height: computedHeight + 'px', background: '#F5F5F5' }">
          <p>{{ day }}</p>
        </div>
      </div>

      <div  
        v-for="(week, weekIndex) in Calendar" 
        :key="weekIndex"
        class="flex flex-1 relative w-full"
        style="align-items: center;"
      >
        <div
          v-for="(day, dayIndex) in week" 
          :key="dayIndex"
          class="empty-cell white-cell flex-half border border-gray-d9d9d9"
          :style="{ 
            width: '14.285%', 
            height: computedHeight + 'px', 
            position: 'relative' 
          }"
          :class="{
            'gray-cell': day && day.state === 5,
            'green-cell': day && day.state === 3,
            'red-cell': day && day.state === 4
          }"
          @click="modalCellClick(day)"
        >
          <!-- Условное отображение элемента <p> для firstValue, отображается только если child существует -->
          <p v-if="day" class="day-num" style="position: absolute; top: 10px; right: 20px;">{{ day.day }}</p>
          <!-- Условное отображение элемента <p> для secondValue и thirdValue, отображается только если child существует -->
          <p v-if="day" class="posts-nonum" style="position: absolute; bottom: 10px; left: 20px;">
            <span class="posts-num">{{ day.capacity }}</span> {{ day.formatCount}}
          </p>
        </div>
      </div>

      <div class="flex w-full" style="margin-top: 20px; margin-bottom: 50px">
        <div class="flex" style="margin-right: 150px;"><div style="width: 30px; height: 30px; background-color: #C2C3C7; margin-right: 20px"></div><p style="align-self: center;">Нет данных по сотрудникам</p></div>
        <div class="flex" style="margin-right: 150px;"><div style="width: 30px; height: 30px; background-color: #87C23E; margin-right: 20px"></div><p style="align-self: center;">Изменено количество постов</p></div>
        <div v-if="isAnyCellRed" class="flex"><div style="width: 30px; height: 30px; background-color: #E31E24; margin-right: 20px"></div><p style="align-self: center;">Добавлен выходной день</p></div>
      </div>
    </TabularSection>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';

import TabularSection from '@/components/Tabular/TabularSection.vue';
import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
import TabularFilterMonth from '@/components/Tabular/TabularFilterMonth.vue';

import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
import BaseButtonFilledLight from '@/components/BaseButtonFilledLight.vue';
import BaseButtonFilledRed from '@/components/BaseButtonFilledRed.vue';
import ModalBoolean from '@/components/ModalBooleanGreen.vue';
import ModalBooleanGray from '@/components/ModalBooleanGray.vue';
import BaseButtonFilledDark from '@/components/BaseButtonFilledDark.vue';
import '@vuepic/vue-datepicker/dist/main.css';

//////////
//оч важный блок
//////////
import isEnv from '@/utils/isEnv.js';
import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';
import { sadminApiClient } from '@/api/sadminApiClient';
import { directorApiClient } from '@/api/directorApiClient';
import { computed, onMounted } from 'vue';
const sadminStationsStore = useSadminServiceStationsStore();
const apiClient = isEnv('sadmin') ? sadminApiClient : directorApiClient;
const postLim = ref(4);
let filterDateStart = ref(1675882800);

function selectDateHandler(date) {
	filterDateStart.value = (date + 86400);
	console.log(filterDateStart.value);
  applyFilters()
}

function getGenitiveMonthName(unixTime) {
    const monthsGenitive = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    const date = new Date(unixTime * 1000); // Умножаем на 1000, так как Unix timestamp в секундах

    const monthIndex = date.getMonth();
    return monthsGenitive[monthIndex];
}
/////////
///Модальные окна
/////////
let modal = ref({});
const gray = ref({
  isVisible: false, // Флаг видимости окна gray
  mainTitle: '', // Основной заголовок окна
  mainText: '', // Основной текст окна
  primaryButtonText: 'Закрыть', // Текст кнопки
});

function grayOpen(title, text){
gray.value.isVisible = true
gray.value.mainTitle = title;
gray.value.mainText = text;
}
function grayClose(){
gray.value.isVisible = false
}
// isVisible: Boolean,
//   mainTitle: String,
//   mainText: String,
//   primaryButtonComponent: Object,
//   primaryCountText: Number,
//   primaryButtonText: String,
//   secondaryButtonText: String

/* <ModalBoolean
    @callback="modal.callback"
    :is-visible="modal.isVisible"
    :primary-button-component="modal.buttonComponent"
    :primary-count-text="modal.primaryCountText"
    :main-title="modal.mainTitle"
    :main-text="modal.mainText"
    :primary-button-text="modal.primaryButtonText"
    :secondary-button-text="modal.secondaryButtonText"
  /> */
  function greenOpen(day) {

  // Установка компонента кнопки в зависимости от выходного дня
    modal.value.isWeekend = day.isWeekend;
  
  // Установка текстовых данных модального окна
  modal.value.mainText = 'Количество постов';
  modal.value.primaryCountText = day.capacity;
  modal.value.secondaryButtonText = 'Применить';

  // Формирование заголовка с учетом даты
  let dayNumber = day.day;
  let monthName = getGenitiveMonthName(day.unix);
  modal.value.day = dayNumber;
  modal.value.mainTitle = `${dayNumber} ${monthName}`;

  // Отображение модального окна
  modal.value.isVisible = true;
    console.log(modal.value);
  // Обработчик сохранения данных
}
  async function handleUpdateData(updatedData){
    modal.value.isVisible = false;
    const { postNumber, isWeekend, dayNumber } = updatedData;
     // Определение нового состояния
        const newState = isWeekend ? 2 : 1;

      // Формирование объекта запроса
      const requestBody = {
        filters: {
          dateStart: filterDateStart.value,
          carCenters: [carCenterIds.value]
        },
        day: dayNumber,
        newCapacity: postNumber,
        newState: newState
      };
    
    const response = await apiClient.post('/manage/shift-calendar', requestBody);
    const items = response.data.items;
    isAnyCellRed.value = items.some(item => item.state === 4) ? true : false;
    Calendar.value = processedData(items, requestBody.filters.dateStart);
    //postNumber это число newCapacity
    //isWeekend boolean, "newState": 1 если false и "newState": 2 если true
    //dayNumber это число day
    //filterDateStart.value время в unix dateStart
    //carCenterIds.value это id центра, он изначально не находится в квадратных скобках
  }


// state 1	Обычный день. Изменений директор в этом дне не делал, можно поставить выходной или изменить количество постов.
// state 2	Нельзя изменять количество постов или ставить выходной в этой ячейке. (По причине того, что там уже есть заказы)
// state 3	Были изменения в этом дне. Можно ещё раз изменить или поставить выходной.
// state 4	Выходной день. Можно снять его
// state 5	Нет расписания на этот день. Никаких действий с этой ячеек сделать нельзя

/////////
/// обработка модальных окон



function modalCellClick(day){
  if(!day.canChange){
    if(day.state === 5){
      grayOpen('Нет расписания на этот день', 'Никаких действий с этой ячеек сделать нельзя.');
    }
    else{
      let dayNumber = day.day;
      let monthName = getGenitiveMonthName(day.unix);
      grayOpen('Имеется запись', `На ${dayNumber} ${monthName} имеется запись. Изменить численность постов невозможно.`, 'Закрыть');
    }
  }
  else{
    greenOpen(day);
  }
  console.log(day);
}
///
/////////

const carCenterIds = computed(() => {
      // Замените эту логику на реальный вызов функции isEnv и доступ к sadminStationsStore
      return isEnv('sadmin') 
        ? sadminStationsStore?.getSelectedServiceStation().id
        : "none";
    });
//////////
//
//////////



///
/// Расчёт пустых дней календаря
///
const Calendar = ref([]);

function getFirstDayOfMonth(year, month) {
  if (month < 0 || month > 11) {
    throw new Error('Неверное значение месяца');
  }
  return new Date(year, month, 1).getDay() === 0 ? 6 : new Date(year, month, 1).getDay() - 1;
}
function formatPostCount(count) {
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return "постов";
    } else {
        const lastDigit = count % 10;
        if (lastDigit === 1) {
            return "пост";
        } else if (lastDigit >= 2 && lastDigit <= 4) {
            return "поста";
        } else {
            return "постов";
        }
    }
}

function processedData(response, unixTime) {
  // Функция для определения первого дня недели месяца
  const responseDate = new Date(unixTime * 1000);
  const year = responseDate.getFullYear();
  const month = responseDate.getMonth();

  // Определение количества элементов для заполнения значением null
  const nullCount = getFirstDayOfMonth(year, month);

  // Создаем массив из 31 элемента, заполненный значениями null сначала
  const processedData = Array(nullCount).fill(null);

  for (const item of response) {
    const { day, capacity, state } = item;
    const unix = unixTime;
    const isWeekend = state === 4;
    const wereChanges = state === 3;
    const canChange = state === 1 || state === 3 || state === 4;
    const formatCount = formatPostCount(capacity);
    processedData.push({ day, capacity, state, wereChanges, canChange, isWeekend, formatCount, unix });
  }
  const remainingNulls = (7 - (processedData.length % 7)) % 7;

  // Добавляем пустые дни в конец массива
  for (let i = 0; i < remainingNulls; i++) {
    processedData.push(null);
  }
  //return processedData;
  const weeks = [];
  for (let i = 0; i < processedData.length; i += 7) {
    weeks.push(processedData.slice(i, i + 7));
  }

  return weeks;
}
///
///
///
const isAnyCellRed = ref(false);

async function applyFilters() {
  const responseBody = {
    filters: {
      interval: 'month',
      dateStart: filterDateStart.value,
      works: null,
      carCenters: [carCenterIds.value], // Предполагается, что carCenterIds.value уже определено где-то в коде
      page: 1
    }
  };
  const url = '/manage/get-shift-calendar';
  try {
    const response = await apiClient.post(url, responseBody);
    postLim.value = response.data.postsLimit;
    const items = response.data.items;
    isAnyCellRed.value = items.some(item => item.state === 4) ? true : false;
    Calendar.value = processedData(items, responseBody.filters.dateStart);
    console.log(Calendar.value);
  } catch (error) {
    console.error('Ошибка при применении фильтров:', error);
    // В случае ошибки можно добавить дополнительные действия, например, вывод сообщения об ошибке
  }
}

onMounted(() => {applyFilters()});
</script>
<script>
export default {
  setup() {
  },
  data() {
    return {
      computedHeight: 0, // начальное значение
      week: []
    };
  },
  computed: {
    // Вычисляемое свойство, проверяющее, есть ли нажатые ячейки
    
  },
  methods: {
    // Метод обрабатывает клик, изменяет состояние для конкретной ячейки
    handleClick(cellId) {
      this.clickedCells[cellId] = !this.clickedCells[cellId];
      this.$forceUpdate();
    },
    fillWeekWithData(response) {
    // Заполнение массива week данными из response
    this.week = response.items;
  }
  },
  mounted() {
    
    this.$nextTick(() => {
      // Предположим, что у вас есть элемент с классом 'empty-cell' для вычисления ширины
      const elementWidth = document.querySelector('.empty-cell').clientWidth;
      this.computedHeight = elementWidth * 0.4; // Высота равна половине ширины
    });
  },
};
</script>
<style>
/* .white-cell#child-1-0{
background-color: #C2C3C7;
box-shadow: inset 0 0 0 2px #fff;
}
.white-cell#child-1-0:hover{
  box-shadow: inset 0 0 0 2px #f00;
}
.white-cell#child-1-0 p,.white-cell#child-1-0 span {
color: #fff;}
*/
.green-cell{
background-color: #87C23E;
box-shadow: inset 0 0 0 2px #fff;
}
.gray-cell{
background-color: #C2C3C7;
box-shadow: inset 0 0 0 2px #fff;}

.white-cell:hover{
  box-shadow: inset 0 0 0 2px #f00; /* Внутренний border красного цвета */
}
.white-cell{
padding: 15px 20px;
}
.red-cell {
  background-color: #E31E24; /* Цвет фона для активированных ячеек */
  box-shadow: inset 0 0 0 2px #fff;}

.day-num{
  font-family: Inter;
  font-size: 20px;
  font-weight: 500;
  line-height: 24.2px;
  text-align: right;
  color: #080808;}
.posts-nonum{
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 19.36px;
  text-align: left;

}
.posts-num{
  font-family: Inter;
  font-size: 20px;
  font-weight: 500;
  line-height: 24.2px;
  text-align: left;
}

.nusdfdsfll{
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;}
#nusdfdsfll{
  font-family: Inter;
font-size: 24px;
font-weight: 500;
line-height: 29.05px;
text-align: center;
}

</style>
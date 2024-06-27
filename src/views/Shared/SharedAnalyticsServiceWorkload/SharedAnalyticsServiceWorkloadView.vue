<template>
  <!-- Модальное окно для отображения деталей блока -->
  
  <OrderReceptionScreen 
    v-if="order.isVisible"
    :block-data="order.blockData"
    :order-minutes="order.orderMinutes"
    :free-blocks="order.freeBlocks"
    :selected-works="order.selectedWorks"
    :order-time="orderMinutes"
    :unix-date="order.dateStart"
    :is-sadmin="apiClientIsSadmin"
    @callback="FakeOpen"
    @close="orderClose"/>
  <ModalServiceLoadClient
      v-if="showModal"
      :is-visible="showModal"
      :block-data="selectedBlock"
      :order-minutes="orderMinutes"
      :free-blocks="freeBlocks"
      @close-modal="closeModal"
      @submit="orderOpen"
    />
  <MainHeader />
  <MainHeaderGap />
  
  <!-- <TabularSection> -->
    <TabularSection>
    <TabularPrimeTitle class="mb-2">Загруженность сервиса {{ unixToDatePeriodHeader(filterDateStart)}}</TabularPrimeTitle>
    <TabularPrimeDescription class="mb-5"
      >Свободно для записи  постов: {{ freePostsCount }}, на {{ formattedTotalFreeTime }}</TabularPrimeDescription
    >
    <TabularFiltersWrapper>
      <SharedAnalyticsServiceWorkloadFilterFreeWindows @update-time="handleUpdateTime" />
      <TabularFilterDate @updateDate="selectDateHandler"/>
      <TabularButtonApplyFilters @click="applyFilters"/>
    </TabularFiltersWrapper>
    <div class="flex flex-col w-full mt-7">
      <div class="flex w-full">
        <div class="flex items-center pl-[10px] w-[100px] text-lg font-medium h-[42px] border border-gray-d9d9d9">Пост</div>
        <div v-for="(timeSlot, index) in timeSlots" :key="index" class="flex items-center justify-center flex-1 h-[42px] border border-gray-d9d9d9">
            {{ timeSlot }}
          </div>
      </div>
      <div v-for="post in items" :key="post.post" class="flex">
        <div :class="['flex items-center border w-[100px] h-[50px] pl-[10px] border-gray-d9d9d9']">
          <div class="flex flex-col">
            <div class="flex font-semibold text-base leading-none">№{{ post.post }}</div>
            <div v-if="!post.isActive" class="flex text-gray-a1a4ad text-sm leading-none mt-1">Не раб.</div>
            <div v-else class="flex text-gray-a1a4ad text-sm leading-none mt-1">{{ calculateFreeTime(post.blocks) }}</div>
          </div>
        </div>
        <div class="flex flex-1 relative w-full" style="align-items: center;">
          <template v-if="post.isActive" v-for="block in post.blocks" :key="block.blockStart">
            <div :class="['block', getBlockClass(block.type)]" :style="getBlockStyle(block)"  @click="openModal(block, post.post)">
              <div class="blocks-time">{{ calculateFreeBlockTime(block) }}</div>
              <div>{{ canDisplayPlateAfterTime(block) }}</div>
            </div>
          </template>
          <template v-else>
            <!-- Отображение блока "НЕ РАБ" -->
            <div class="block non-working" :style="{ width: '100%', height: '40px' }">
              <div class="blocks-time">{{timeSlots.length}}ч 00м</div>
              <div>НЕ РАБ</div>
            </div>
          </template>
          <div v-for="n in timeSlots.length*2" :key="`empty-${n}`" class="empty-cell flex-half border border-gray-d9d9d9" :style="{ width: `${100/(timeSlots.length*2)}%` }"></div>
        </div>
      </div>
    </div>
  </TabularSection>
  <!-- <ModalServiceLoadClient
    v-if="showModal"
    :post-number="selectedBlock.postNumber"
    :window-state="selectedBlock.state"
    :start-time="selectedBlock.startTime"
    :end-time="selectedBlock.endTime"
    :duration="selectedBlock.duration"
    @close-modal="closeModal"
  /> -->
</template>
<script setup>
import { ref, onMounted } from 'vue';
import OrderReceptionScreen from '@/components/OrderReceptionScreen.vue';
import FakeWorkAdd from '@/components/FakeWorkAdd.vue';
import TabularSection from '@/components/Tabular/TabularSection.vue';
import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
import TabularPrimeDescription from '@/components/Tabular/TabularPrimeDescription.vue';
import TabularFiltersWrapper from '@/components/Tabular/TabularFiltersWrapper.vue';
//import TabularFilterPeriod from '@/components/Tabular/TabularFilterPeriod.vue';
import TabularFilterDate from '@/components/Tabular/TabularFilterDate.vue';
//import TabularFilterPosts from '@/components/Tabular/TabularFilterPosts.vue';
import SharedAnalyticsServiceWorkloadFilterFreeWindows from '@/views/Shared/SharedAnalyticsServiceWorkload/SharedAnalyticsServiceWorkloadFilterFreeWindows.vue';
import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';
//import TabularButtonCross from '@/components/Tabular/TabularButtonCross.vue';
import TabularButtonApplyFilters from '@/components/Tabular/TabularButtonApplyFilters.vue';

//import ModalServiceLoadClient from '@/components/ModalServiceLoadClient.vue';
import ModalServiceLoadClient from '@/components/ModalServiceLoadClient.vue';
import directorApiGetServiceWorkload from '@/api/director/directorApiGetServiceWorkload.js';
import sadminApiGetServiceWorkload from '@/api/sadmin/sadminApiGetServiceWorkload.js';
//////////
//оч важный блок
//////////
import isEnv from '@/utils/isEnv.js';
import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';
import { sadminApiClient } from '@/api/sadminApiClient';
import { directorApiClient } from '@/api/directorApiClient';
import { computed } from 'vue';

import { unixToDatePeriodHeader, getUnixToday } from '@/utils/time/dateUtils.js';

const sadminStationsStore = useSadminServiceStationsStore();
//const apiClient = ref(isEnv('sadmin') ? sadminApiClient : directorApiClient);
const apiClientIsSadmin = ref(isEnv('sadmin'));
import { useStore } from '@/stores/main.js';


const timeSlots = computed(() => {
  const slots = [];
  let __start = Math.round(shiftStart.value/60);
  let __end = Math.round(shiftEnd.value/60)-1;
  for (let hour = __start; hour <= __end; hour++) {
    slots.push(`${hour}:00`);
  }
  return slots;
});

const Store = useStore();


const carCenterId = computed(() => {
    return isEnv('sadmin') 
      ? [useSadminServiceStationsStore()?.getSelectedServiceStation().id]
      : null;
  });

//////////
//
//////////

let BASE_HOUR_WIDTH = 130;

const shiftStart = ref(0);
const shiftEnd = ref(0);

const freeBlocks = ref([]);
const freePostsCount = computed(() => freeBlocks.value.length);
const totalFreeTime = ref(0); // Суммарное время свободных постов в минутах

let totalMinutes = ref(0);
let filterDateStart = ref(getUnixToday());

let handleUpdateTime = (minutes) => {
  totalMinutes.value = minutes;
};
let selectDateHandler = (date) => {
  filterDateStart.value = (Math.floor(date)+0);
}

const mainDate = ref(0);
const mainPage = ref(1);


//let carCenter = ref('ИБ-29388');
const items = ref([]); // Используем для хранения данных о постах

const works = ref([]);
const selectedWorks = ref([]);
const orderMinutes = computed(() => totalMinutes.value);
const dateStart = computed(() => filterDateStart.value);


//console.log(sadminStationsStore?.getSelectedServiceStation().id);
const apiCallServiceWorkload = isEnv('sadmin') ? sadminApiGetServiceWorkload : directorApiGetServiceWorkload;

onMounted(() => {
  mainPage.value = Store.mainPage;
  applyFilters();
});

onMounted(async () => {
  // const workList = async () => {
  // console.log(await apiClient.get('/all-works'));}
  // workList();
  //
  // works.value.forEach((work) => {console.log(work.id)})
  // console.log(works.value);
 
  // console.log(works.value[0]);
  
  works.value = await Store.workList();
  
});

const request = computed(() => ({
  orderMinutes: orderMinutes.value,  
  posts: null, // список постов
  filters: {
    interval: null,
    dateStart: dateStart.value, 
    works: null, //список работ
    carCenters: carCenterId.value, //центр
    page: 1
  }
}));


const applyFilters = async () => {
  try {
    const response = await apiCallServiceWorkload(request.value);
    items.value = response.items;
    // Обнуляем значения перед пересчетом
    freeBlocks.value = [];
    totalFreeTime.value = 0;

    shiftStart.value = response.shiftStart;
    shiftEnd.value = response.shiftEnd;

    // Пересчитываем значения
    response.items.forEach((item) => {
      if (item.isActive) {
        
        const freeTimeBlocks = item.blocks.filter(block => block.type === 'free');
        freeTimeBlocks.forEach((block) => {
          block.postNumber = item.post;
          totalFreeTime.value += (block.blockEnd - block.blockStart); // Добавляем время свободных блоков
          freeBlocks.value.push(block);
        });
      }
    });
    
  } catch (error) {
    console.error('Error applying filters:', error);
  }
};

function getBlockStyle(block) {
  // Рассчитываем ширину одного часа
  let hourWidth = 1760/timeSlots.value.length;
  
  // Переводим время начала и окончания блока в минуты от начала рабочего дня
  const blockStartMinutes = block.blockStart - shiftStart.value; // 480 минут соответствует 8:00 утра
  const blockEndMinutes = block.blockEnd - shiftStart.value;
  
  // Вычисляем продолжительность блока в минутах
  const blockDurationMinutes = blockEndMinutes - blockStartMinutes;
  
  // Переводим продолжительность блока в пиксели
  const blockWidth = (blockDurationMinutes / 60) * hourWidth;
  console.log("blockDurationMinutes");
  console.log(blockDurationMinutes);
  console.log("hourWidth");
  console.log(hourWidth);
  console.log("blockWidth");
  console.log(blockWidth);
  
  // Вычисляем смещение блока относительно начала контейнера
  const blockOffset = (blockStartMinutes / 60) * hourWidth;

  return {
    left: `${blockOffset}px`,
    width: `${blockWidth}px`,
  };
}

function calculateFreeTime(blocks) {
  const freeTimeBlocks = blocks.filter(block => block.type === 'free');
  const totalFreeMinutes = freeTimeBlocks.reduce((sum, block) => sum + (block.blockEnd - block.blockStart), 0);
  const hours = Math.floor(totalFreeMinutes / 60);
  const minutes = totalFreeMinutes % 60;
  return `${hours}ч ${minutes}м`;
}
const formattedTotalFreeTime = computed(() => {
  const hours = Math.floor(totalFreeTime.value / 60);
  const minutes = totalFreeTime.value % 60;
  return `${hours} ч ${minutes} мин`;
});

function canDisplayPlate(block) {
  const duration = block.blockEnd - block.blockStart;
  const width = (duration / 60) * 1760/timeSlots.value.length; // Ширина блока
  const minWidthForPlate = 120; // Минимальная ширина блока, при которой номер машины еще читаем (примерное значение, нужно подобрать)

  return width >= minWidthForPlate;
}

function calculateFreeBlockTime(block) {
  let duration = block.blockEnd - block.blockStart;
  let hours = Math.floor(duration / 60);
  let minutes = duration % 60;
  let timeString = `${hours} ч ${minutes} м`;
  if(hours==0){timeString = `${minutes} м`;}
  
  // Возвращаем строку с временем и проверяем, влезет ли номер
  return `${timeString}`;
}

function canDisplayPlateAfterTime(block) {
  let duration = block.blockEnd - block.blockStart;
  let hours = Math.floor(duration / 60);
  let minutes = duration % 60;
  let timeString = `${hours}ч ${minutes}м`;
  if(hours==0){timeString = `${minutes}м`;}
  
  // Возвращаем строку с временем и проверяем, влезет ли номер
  if (canDisplayPlate(block) && block.type == 'busy') {
    return `${block.plate}`;
  }
}

function getBlockClass(type) {
  return {
    'busy': 'block-busy',
    'free': 'block-free',
    'short': 'block-short',
  }[type];
}



let modal = ref({});

const showModal = ref(false);
const selectedBlock = ref({});


function openModal(block, postNumber) {
  selectedBlock.value = { ...block, postNumber }; 
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  applyFilters();
}

let order = ref({});

function orderOpen(data){
  closeModal();
  console.log(data);
  order.value.isVisible = true;
  order.value.blockData = data.blockData;
  order.value.orderMinutes = data.orderMinutes;
  order.value.freeBlocks = data.freeBlocks;
  order.value.dateStart = dateStart.value;
}
function orderClose(){
  order.value.isVisible = false;
  applyFilters();
  //Fake.value.isVisible = false;
}


</script>

<style>
.block {
  position: absolute;
  display: flex;
  align-items: center;
  height: 40px;
  z-index: 8;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  border-width: 0px 2px;
  border-style: solid;
  border-right-color: #FFFFFF00;
  border-left-color: #FFFFFF;
}

.block-busy {
  background-color: #EA7E6F88; /* Красный для занятых */
}

.block-free {
  background-color: #34D399; /* Зелёный для свободных */
  box-shadow: 6px 0px 0px 0px #059669 inset;}

.block-short {
  background-color: #34D3994D; /* Синий для коротких */
  
}
.non-working {
  background-color: #D8D8D888; /* Фон для нерабочего блока */
  color: #000; /* Цвет текста */
}
.blocks-time{
    --dp-font-family: "Inter";
    --dp-font-size: 24px;
    margin: 0 10px;
    font-weight: bold;
}
.block-free>.blocks-time{
  color: white;
}

.empty-cell {
  min-height: 50px; /* Минимальная высота для ячеек сетки */
}
.z-index-auto{
  z-index: auto;
}
</style>
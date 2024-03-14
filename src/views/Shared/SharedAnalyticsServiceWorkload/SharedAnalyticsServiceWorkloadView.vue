<template>
  <!-- Модальное окно для отображения деталей блока -->
  <ModalServiceLoadClient
      v-if="showModal"
      :is-visible="showModal"
      :block-data="selectedBlock"
      @close-modal="closeModal"
    />
  <MainHeader />
  <MainHeaderGap />
  <!-- <TabularSection> -->
    <TabularSection>
    <TabularPrimeTitle class="mb-2">22 сентября 2023, 11:25</TabularPrimeTitle>
    <TabularPrimeDescription class="mb-5"
      >Свободно для записи  постов: {{ freePostsCount }}, на {{ formattedTotalFreeTime }}</TabularPrimeDescription
    >
    <TabularFiltersWrapper>
      <SharedAnalyticsServiceWorkloadFilterFreeWindows @update-time="handleUpdateTime" />
      <TabularFilterDate @updateDate="handleSelectedDate"/>
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
              <div class="blocks-time">12ч 00м</div>
              <div>НЕ РАБ</div>
            </div>
          </template>
          <div v-for="n in 24" :key="`empty-${n}`" class="empty-cell flex-half border border-gray-d9d9d9" :style="{ width: '4.167%' }"></div>
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
import { ref, computed } from 'vue';

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

let baseWidthPerHour = 130;

const freePostsCount = ref(0); // Количество свободных постов
const totalFreeTime = ref(0); // Суммарное время свободных постов в минутах

let totalMinutes = ref(0);
let filterDateStart = ref(1675882800);

let handleUpdateTime = (minutes) => {
  totalMinutes.value = minutes;
};
let handleSelectedDate = (date) => {
  filterDateStart.value = (Math.floor(date)+86400);
}


let posts = [1, 2, 3, 4, 5, 6];
let carCenter = ref('ИБ-29388');
const items = ref([]); // Используем для хранения данных о постах

const orderMinutes = computed(() => totalMinutes.value);
const dateStart = computed(() => filterDateStart.value);

const request = computed(() => ({
  orderMinutes: orderMinutes.value, 
  posts: [1, 2, 3, 4, 5, 6], // список постов
  filters: {
    interval: null,
    dateStart: dateStart.value, 
    works: ['11111', '22222', '33333', '44444', '55555'], //список работ
    carCenters: ['C-1111'], //центр
    page: 1
  }
}));


const applyFilters = async () => {
  try {
    const response = await directorApiGetServiceWorkload(request.value); // Используйте .value здесь
    items.value = response.items;
    // Обнуляем значения перед пересчетом
    freePostsCount.value = 0;
    totalFreeTime.value = 0;
    // Пересчитываем значения
    response.items.forEach((item) => {
      if (item.isActive) {
        freePostsCount.value += 1; // Увеличиваем количество свободных постов
        const freeTimeBlocks = item.blocks.filter(block => block.type === 'free');
        freeTimeBlocks.forEach((block) => {
          totalFreeTime.value += (block.blockEnd - block.blockStart); // Добавляем время свободных блоков
        });
      }
    });
  } catch (error) {
    console.error('Error applying filters:', error);
  }
};

function getBlockStyle(block) {
  // Рассчитываем ширину одного часа
  const hourWidth = document.querySelector('.flex.items-center.justify-center.flex-1.h-\\[42px\\].border.border-gray-d9d9d9').offsetWidth-0.5;
  
  // Переводим время начала и окончания блока в минуты от начала рабочего дня
  const blockStartMinutes = block.blockStart - 480; // 480 минут соответствует 8:00 утра
  const blockEndMinutes = block.blockEnd - 480;
  
  // Вычисляем продолжительность блока в минутах
  const blockDurationMinutes = blockEndMinutes - blockStartMinutes;
  
  // Переводим продолжительность блока в пиксели
  const blockWidth = (blockDurationMinutes / 60) * hourWidth;
  
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
  const width = (duration / 60) * document.querySelector('.flex.items-center.justify-center.flex-1.h-\\[42px\\].border.border-gray-d9d9d9').offsetWidth; // Ширина блока
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

const timeSlots = computed(() => {
  const slots = [];
  for (let hour = 8; hour <= 19; hour++) {
    slots.push(`${hour}:00`);
  }
  return slots;
});

let modal = ref({});

const showModal = ref(false);
const selectedBlock = ref({});


function openModal(block, postNumber) {
  selectedBlock.value = { ...block, postNumber }; 
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}


applyFilters();
</script>

<style>
.block {
  position: absolute;
  display: flex;
  align-items: center;
  height: 40px;
  z-index: 9;
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
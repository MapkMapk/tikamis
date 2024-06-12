<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <!-- Модальное окно для отображения деталей блока -->
  
  <OrderReceptionScreen 
    v-if="order.isVisible"
    @callback="FakeOpen"
    @close="orderClose"/>
  <ModalServiceLoadClient
      v-if="showModal"
      :is-visible="showModal"
      :block-data="selectedBlock"
      @close-modal="closeModal"
      @submit="orderOpen"
    />
  <MainHeader />
  <MainHeaderGap />
  <FakeWorkAdd 
  v-if="Fake.isVisible"
  @close="FakeClose"/>
  <!-- <TabularSection> -->
    <TabularSection>
    <TabularPrimeTitle class="mb-2">22 сентября 2023, 11:25</TabularPrimeTitle>
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
              <div class="blocks-time">12ч 00м</div>
              <div>НЕ РАБ</div>
            </div>
          </template>
          <div v-for="n in 24" :key="`empty-${n}`" class="empty-cell flex-half border border-gray-d9d9d9" :style="{ width: '4.167%' }"></div>
        </div>
      </div>
    </div>
  </TabularSection>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import OrderReceptionScreen from '@/components/OrderReceptionScreen.vue';
import FakeWorkAdd from '@/components/FakeWorkAdd.vue';
import TabularSection from '@/components/Tabular/TabularSection.vue';
import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
import TabularPrimeDescription from '@/components/Tabular/TabularPrimeDescription.vue';
import TabularFiltersWrapper from '@/components/Tabular/TabularFiltersWrapper.vue';
import TabularFilterDate from '@/components/Tabular/TabularFilterDate.vue';
import SharedAnalyticsServiceWorkloadFilterFreeWindows from '@/views/Sadmin/Analytics/SadminAnalyticsServiceWorkload/SadminAnalyticsServiceWorkloadFilterFreeWindows.vue';
import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';
import TabularButtonApplyFilters from '@/components/Tabular/TabularButtonApplyFilters.vue';

//import ModalServiceLoadClient from '@/components/ModalServiceLoadClient.vue';
import ModalServiceLoadClient from '@/components/ModalServiceLoadClient.vue';
//import directorApiGetServiceWorkload from '@/api/director/directorApiGetServiceWorkload.js';
import sadminApiGetServiceWorkload from '@/api/sadmin/sadminApiGetServiceWorkload.js';
//////////
//оч важный блок
//////////
import isEnv from '@/utils/isEnv.js';
import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';
import { sadminApiClient } from '@/api/sadminApiClient';
import { computed } from 'vue';
onMounted(async () => {
  let { works: originalWorks } = await mechanicOrderStore.workList();
  originalWorks.forEach((work) => {
    work.isSelected = false;
  });
  works.value = originalWorks;
});




onMounted(async () => {
  await initializeWorks();
});

async function initializeWorks() {
  let { works: originalWorks } = await mechanicOrderStore.workList();
  originalWorks.forEach((work) => {
    work.isSelected = false;
  });
  works.value = originalWorks;
}

const carCenterIds = sadminStore.carCenterId;
  const filterDateStart = ref(sadminStore.mainTime);
  const freePostsCount = ref(0);
  const totalFreeTime = ref(0);
  const totalMinutes = ref(0);
  const items = ref([]);
  const works = ref([]);

  // Вычисляемые значения
  const orderMinutes = computed(() => totalMinutes.value);
  const dateStart = computed(() => filterDateStart.value);
  const request = computed(() => ({
    orderMinutes: orderMinutes.value,
    posts: [1, 2, 3, 4, 5, 6],
    filters: {
      interval: null,
      dateStart: dateStart.value,
      works: works.value,
      carCenters: [carCenterIds.value],
      page: sadminStore.mainPage,
    },
  }));
  
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
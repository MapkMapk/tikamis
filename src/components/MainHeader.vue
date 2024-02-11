<template>
  <ModalSelectServiceStations @callback="isVisibleModalSelectServiceStations = false" :is-visible="isVisibleModalSelectServiceStations" />
  <header class="fixed z-10 bg-white flex w-full h-the-header">
    <div class="flex w-full">
      <div
        @click="mainStore.isHeaderMenuOpen = !mainStore.isHeaderMenuOpen"
        :class="{
          'bg-gray-2c2d2f': mainStore.isHeaderMenuOpen,
          'border-b-0': mainStore.isHeaderMenuOpen
        }"
        class="relative flex bg- h-full pl-[30px] pr-[30px] justify-center items-center border-r border-b border-gray-dcdcdc cursor-pointer"
      >
        <BaseSvgIcon
          :name="!mainStore.isHeaderMenuOpen ? 'burger-menu' : 'cross'"
          class="w-[30px] h-[30px]"
        />
      </div>
      <div class="flex justify-between items-center w-full border-b border-gray-dcdcdc">
        <div class="flex items-center ml-7">
          <BaseSvgIcon
            name="logo"
            class="w-[32px] h-[32px]"
          />
          <span class="pl-[10px] font-semibold text-lg">{{ isEnv('director') ? 'Директор' : 'Суперадмин'}}</span>
          <span class="pl-[30px] text-lg"></span>
        </div>
        <div
          v-if="isEnv('director')"
          class="pr-[30px]"
        >
          {{ formattedFullAddress }}
        </div>
        <div
          @click="isVisibleModalSelectServiceStations = true"
          v-if="isEnv('sadmin')"
          class="flex pr-[30px] border-l border-l-gray-dcdcdc h-full"
        >
          <div class="flex items-center pl-[20px] cursor-pointer">
            <div class="flex flex-col justify-center">
              <div class="text-gray-a1a4ad text-sm">Сервисы</div>
              <div class="text-2xl">Выбранные ({{sadminBaseStore.getAmountOfSelectedServiceStations()}})</div>
            </div>
            <BaseSvgIcon
              name="arrow-down-gray"
              class="w-[14px] h-[8px] -rotate-90 ml-[50px]"
            />
          </div>
        </div>
      </div>
    </div>
    <MainHeaderMenu />
  </header>
</template>

<script setup>
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
import { useMainStore } from '@/stores/shared/main.js';
import MainHeaderMenu from '@/components/MainHeaderMenu.vue';
import { computed, onMounted, ref } from 'vue';
import directorApiCenterInfo from '@/api/director/directorApiCenterInfo.js';
import isEnv from '@/utils/isEnv.js';
import ModalSelectServiceStations from '@/components/ModalSelectServiceStations.vue';
import sadminApiAllCarCenters from '@/api/sadmin/sadminApiAllCarCenters.js'
import { useSadminBaseStore } from '@/stores/sadmin/sadminBase.js'

const mainStore = useMainStore();
const sadminBaseStore = useSadminBaseStore();

let isVisibleModalSelectServiceStations = ref(false);
let city = ref('');
let address = ref('');
let formattedFullAddress = computed(() => city.value + ', ' + address.value);

onMounted(async () => {
  if (isEnv('director')) {
    await getCenterInfo();
  }
  if (isEnv('sadmin')) {
    const { carCenters } = await sadminApiAllCarCenters();
    carCenters.forEach((station) => {
      station.isSelected = true;
    });
    sadminBaseStore.serviceStations = carCenters;
  }
});

async function getCenterInfo() {
  const data = await directorApiCenterInfo();
  city.value = data.city;
  address.value = data.addressName;
}
</script>

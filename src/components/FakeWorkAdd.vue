<template>
  <section v-if="props.isVisible" class="z-[9] flex flex-col justify-center items-center fixed w-full h-screen left-0 bg-white-ffffff">
    <span class="flex justify-center text-center text-4xl font-medium">Добавить услуги</span>
    <div class="relative container w-full">
      <div
        :class="{ 'border-green': searchInputText.length > 0 }"
        class="border-2 border-gray-a1a4ad mt-7 flex justify-between"
      >
        <div class="flex w-full items-center h-[80px] px-[30px]">
          <BaseSvgIcon v-if="searchInputText.length > 0" name="loop-green" class="w-6 h-6 mr-5" />
          <BaseSvgIcon v-else name="loop-black" class="w-6 h-6 mr-5" />
          <input
            v-model="searchInputText"
            type="text"
            placeholder="Начните вводить название услуги"
            class="w-full text-2xl mr-5"
          />
          <BaseSvgIcon @click="searchInputText = ''" name="cross-in-circle" class="w-6 h-6 cursor-pointer ml-auto" />
        </div>
      </div>
      <div class="w-full flex flex-col border border-gray-a1a4ad border-t-0">
        <div v-if="amountOfSelectedWorks > 0" class="flex flex-wrap ml-[26px] mr-[26px] pt-2 pb-2">
          <SharedOrderWorkAddCracker
            v-for="(work, index) in works"
            :key="work.workId"
            @deactivate-work="deactivateWork"
            :isSelected="work.isSelected"
            :name="work.name"
            :index="index"
          />
        </div>
        <div class="w-full flex flex-col max-h-[400px] overflow-y-auto">
          <SharedOrderWorkAddWork
            v-for="(work, index) in works"
            :key="work.workId"
            @toggle-work-selection="toggleWorkSelection"
            :search-input-text="searchInputText"
            :isSelected="work.isSelected"
            :work-id="work.workId"
            :name="work.name"
            :price="work.price"
            :index="index"
          />
        </div>
      </div>
    </div>
    <div :class="{'!left-[calc(50%-320px)]': amountOfSelectedWorks > 0}" class="fixed flex justify-center bottom-5 left-[calc(50%-160px)]">
      <BaseButtonFilledLight @click="backToOrder" class="w-[300px] mr-5">Вернуться к заказу</BaseButtonFilledLight>
      <BaseButtonFilledGreen
        @click="addWorksToOrder"
        v-if="amountOfSelectedWorks > 0"
        class="w-[300px] ml-5"
      >
        Добавить
        {{
          `${amountOfSelectedWorks} ${getQuantitativeDeclination(
            amountOfSelectedWorks,
            'услугу',
            'услуги',
            'услуг'
          )}`
        }}
      </BaseButtonFilledGreen>
    </div>
  </section>
</template>

<script setup>
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
import SharedOrderWorkAddWork from '@/views/Shared/SharedOrderWorkAdd/SharedOrderWorkAddWork.vue';
import SharedOrderWorkAddCracker from '@/views/Shared/SharedOrderWorkAdd/SharedOrderWorkAddCracker.vue';
import BaseButtonFilledLight from '@/components/BaseButtonFilledLight.vue';
import getQuantitativeDeclination from '@/utils/getQuantitativeDeclination.js';
import { onMounted, ref, computed, watch } from 'vue';
import { useStore } from '@/stores/main.js';

const store = useStore();

let emit = defineEmits(['close']);
let props = defineProps({
  isVisible: {
    type: Boolean,
    default: false // Значение по умолчанию для isVisible
  },
  selectedWorks: {
    type: Array,
    default: () => [] // Значение по умолчанию для selectedWorks
  }
});

let searchInputText = ref('');
let works = ref([]);

const amountOfSelectedWorks = computed(() => {
  return works.value.filter(work => work.isSelected).length;
});

function getRandomPrice() {
  const possiblePrices = [500, 1000, 1500];
  const randomIndex = Math.floor(Math.random() * possiblePrices.length);
  return possiblePrices[randomIndex];
}

onMounted(async () => {
  let response = await store.workList();
  const originalWorks = Array.isArray(response) ? response : response.works;
  console.log(response);
  console.log('originalWorks:', originalWorks);
  console.log('props.selectedWorks:', props.selectedWorks);
  works.value = originalWorks.map(work => {
    const isSelected = props.selectedWorks && props.selectedWorks.some(selected => selected.id === work.id);
    return { ...work, isSelected, price: null };
  });
  console.log('works.value:', works.value);
});

watch(() => props.selectedWorks, async (newSelectedWorks, oldSelectedWorks) => {
  if (newSelectedWorks !== oldSelectedWorks) {
    let response = await store.workList();
    const originalWorks = Array.isArray(response) ? response : response.works;

    works.value = originalWorks.map(work => {
      const isSelected = newSelectedWorks && newSelectedWorks.some(selected => selected.id === work.id);
      return { ...work, isSelected, price: null };
    });
  }
});

function backToOrder() {
  emit('close');
  
}

function toggleWorkSelection(index) {
  works.value[index].isSelected = !works.value[index].isSelected;
}

function deactivateWork(index) {
  works.value[index].isSelected = false;
}

async function addWorksToOrder() {
  const allSelectedWorks = works.value.filter(work => work.isSelected).map(work => ({ ...work, isSelected: false }));
  console.log(allSelectedWorks);
  emit('close', allSelectedWorks);
}
</script>

<style>
section {
  background: white;
}
</style>

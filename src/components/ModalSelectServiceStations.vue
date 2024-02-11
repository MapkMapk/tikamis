<template>
  <section
    v-if="props.isVisible"
    class="z-50 flex justify-center items-center fixed w-full h-screen left-0 top-0 bg-gray-848484"
  >
    <div class="flex flex-col items-center bg-white w-[520px]">
      <BaseSvgIcon
        @click="emit('callback')"
        name="cross-black"
        class="ml-auto w-[25px] h-[25px] mt-[22px] mr-[20px] cursor-pointer"
      />
      <div class="flex flex-col items-center mt-[20px] mb-[60px] pl-10 pr-10 text-center">
        <span class="font-medium text-3xl">Выберите автосервисы</span>
        <div class="flex flex-col w-full mt-5">
          <div
            class="flex cursor-pointer mt-6"
            v-for="station in sadminBaseStore.serviceStations"
            :key="station.id"
            @click="station.isSelected = !station.isSelected"
          >
            <BaseCheckbox :is-selected="station.isSelected" />
            <div class="ml-[10px]">{{ station.city }}, {{station.addressName}}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
import BaseCheckbox from '@/components/BaseCheckbox.vue';
import { useSadminBaseStore } from '@/stores/sadmin/sadminBase.js';
import { ref } from 'vue';

const sadminBaseStore = useSadminBaseStore();

let serviceStations = ref([]);

let emit = defineEmits(['callback']);
let props = defineProps({
  isVisible: {
    type: Boolean
  }
});

// function toggleServiceStation(station) {
//   station.isSelected = !
// }
</script>

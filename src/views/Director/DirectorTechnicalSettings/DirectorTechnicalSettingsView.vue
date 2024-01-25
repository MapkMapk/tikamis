<template>
  <TheDirectorHeader />
  <div class="w-full flex">
    <TheDirectorMenu />
    <div class="flex flex-col w-full">
      <div
        :class="{ 'w-[calc(100%+30px)] translate-x-[-30px]': mainStore.isHeaderMenuOpen }"
        class="w-full flex justify-center items-center bg-red text-2xl text-white font-medium h-[50px] lg:text-xl"
      >
        Изменения вступят в силу начиная с 25 июня 2023 г.
      </div>
      <section
        :class="{ 'pl-[122px]': !mainStore.isHeaderMenuOpen }"
        class="mt-10 flex flex-1"
      >
        <div class="flex flex-col">
          <h1 class="text-4xl font-medium">Технические настройки</h1>
          <div class="text-2xl font-medium mt-5">Режим работы</div>
          <div class="flex flex-col mt-4">
            <div
              @click="isLiveQueue = false"
              class="flex items-center cursor-pointer"
            >
              <BaseRadioButton :is-active="isLiveQueue" />
              <span class="text-lg ml-2">Без записи, только живая очередь</span>
            </div>
            <div
              @click="isLiveQueue = true"
              class="flex items-center cursor-pointer mt-3"
            >
              <BaseRadioButton :is-active="!isLiveQueue" />
              <span class="text-lg ml-2">Режим записи</span>
            </div>
          </div>
          <div
            v-if="isLiveQueue"
            class="flex mt-6"
          >
            <div class="flex flex-col">
              <span class="text-lg font-semibold">Время начала работы</span>
              <input
                v-model="jobStartTime"
                class="input-regular mt-3"
                type="text"
              />
            </div>
            <div class="flex flex-col ml-8">
              <span class="text-lg font-semibold">Время окончания работы</span>
              <input
                v-model="jobEndTime"
                class="input-regular mt-3"
                type="text"
              />
            </div>
          </div>
          <div
            v-if="isLiveQueue"
            class="flex flex-col mt-10"
          >
            <span class="text-2xl font-medium">Часовой пояс</span>
            <SelectTimezone class="mt-3" />
          </div>
          <div class="flex flex-col mt-10">
            <span class="text-2xl font-medium">Техническая оснащённость постами</span>
            <input
              v-model="postsEquipment"
              type="number"
              class="input-regular w-36 mt-3"
            />
          </div>
          <BaseButtonFilledGreen class="mt-14 mb-5">Применить</BaseButtonFilledGreen>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup>
import TheDirectorHeader from '@/components/TheDirectorHeader.vue';
import TheDirectorMenu from '@/components/TheDirectorMenu.vue';
import BaseRadioButton from '@/components/BaseRadioButton.vue';
import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
import SelectTimezone from '@/components/SelectTimezone.vue';
import { useMainStore } from '@/stores/shared/main.js';
import { ref } from 'vue';

const mainStore = useMainStore();

let isLiveQueue = ref(false);

let jobStartTime = ref('');
let jobEndTime = ref('');
let timeZone = ref('');
let postsEquipment = ref();

// function save() {
//   if (isLiveQueue) {
//
//   } else {
//
//   }
// }
</script>

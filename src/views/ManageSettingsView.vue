<template>
  <TheDirectorHeader />
  <div class="w-full flex overflow-x-hidden pt-[60px]">
    <div class="flex flex-col w-full">
      <div
        :class="{'pl-[300px]': mainStore.isHeaderMenuOpen}"
        class="w-full flex justify-center items-center bg-red text-2xl text-white font-medium h-[50px]"
      >
        Изменения вступят в силу начиная с 25 июня 2023 г.
      </div>
      <section
        :class="{ 'pl-[300px]': mainStore.isHeaderMenuOpen }"
        class="pt-[20px] pl-[122px] flex flex-1 mr-[30px]"
      >
        <div class="flex flex-col w-full max-w-[540px]">
          <h1 class="text-4xl leading-normal font-medium">
            Технические настройки<br />Сургут, Аэрофлотская ул., 5/2
          </h1>
          <div v-if="getViewEnv() === 'sadmin'" class="flex flex-col mt-10 w-full max-w-full">
            <div class="flex w-full">
              <div class="flex flex-col mr-5 w-full">
                <span class="text-lg font-semibold">Логин директора</span>
                <input
                  class="base-input w-full mt-3"
                  type="text"
                />
              </div>
              <div class="flex flex-col w-full">
                <span class="text-lg font-semibold">Пароль директора</span>
                <input
                  class="base-input w-full mt-3"
                  type="password"
                />
              </div>
            </div>
            <div class="flex mt-5">
              Изменение логина или пароля приведёт к отключению<br />
              аккаунта с предыдущими данными.<br />
              Изменения вступят в силу сразу.
            </div>
          </div>
          <div class="text-2xl font-medium mt-5">Режим работы</div>
          <div class="flex flex-col mt-4">
            <div
              @click="isLiveQueue = true"
              class="flex items-center cursor-pointer"
            >
              <BaseRadioButton :is-active="!isLiveQueue" />
              <span class="text-lg ml-2">Без записи, только живая очередь</span>
            </div>
            <div
              @click="isLiveQueue = false"
              class="flex items-center cursor-pointer mt-3"
            >
              <BaseRadioButton :is-active="isLiveQueue" />
              <span class="text-lg ml-2">Режим записи</span>
            </div>
          </div>
          <div
            v-if="!isLiveQueue"
            class="flex mt-6"
          >
            <div class="flex flex-col">
              <span class="text-lg font-semibold">Время начала работы</span>
              <input
                v-model="jobStartTime"
                class="base-input w-full mt-3"
                type="text"
              />
            </div>
            <div class="flex flex-col ml-8">
              <span class="text-lg font-semibold">Время окончания работы</span>
              <input
                v-model="jobEndTime"
                class="base-input w-full mt-3"
                type="text"
              />
            </div>
          </div>
          <div
            v-if="!isLiveQueue"
            class="flex flex-col mt-10"
          >
            <span class="text-2xl font-medium">Часовой пояс</span>
            <BaseSelectTimezone class="mt-3" />
          </div>
          <div class="flex flex-col mt-10">
            <span class="text-2xl font-medium">Техническая оснащённость постами</span>
            <input
              v-model="postsEquipment"
              type="number"
              class="base-input w-36 mt-3"
            />
          </div>
          <div v-if="getViewEnv() === 'sadmin'" class="flex flex-col mt-10">
            <span class="text-2xl font-medium">Производственный люфт</span>
            <span class="text-lg mt-3 mb-3"
              >Установка значения перерыва между обслуживанием автомобилей на посту, в
              минутах.</span
            >
            <input
              v-model="productionBacklash"
              type="number"
              class="base-input w-36 mt-3"
            />
          </div>
          <div v-if="getViewEnv() === 'sadmin'" class="flex flex-col mt-10">
            <span class="text-2xl font-medium">Установка глубины записи в днях</span>
            <input
              v-model="recordingDepth"
              type="number"
              class="base-input w-36 mt-3"
            />
          </div>
          <div class="w-full flex mt-10 mb-5">
            <BaseButtonFilledGreen class="flex flex-1 mr-5">Сохранить</BaseButtonFilledGreen>
            <BaseButtonFilledLight @click="go" class="flex flex-1">Закрыть</BaseButtonFilledLight>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup>
import TheDirectorHeader from '@/components/TheDirectorHeader.vue';
import BaseRadioButton from '@/components/BaseRadioButton.vue';
import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
import BaseSelectTimezone from '@/components/SelectTimezone.vue';
import { useMainStore } from '@/stores/shared/main.js';
import { ref } from 'vue';
import BaseButtonFilledLight from '@/components/BaseButtonFilledLight.vue';
import { getViewEnv } from '@/utils/getViewEnv.js'

const mainStore = useMainStore();
let isLiveQueue = ref(false);

let jobStartTime = ref('');
let jobEndTime = ref('');
// let timeZone = ref('');
let postsEquipment = ref('');
let productionBacklash = ref('');
let recordingDepth = ref('');
</script>

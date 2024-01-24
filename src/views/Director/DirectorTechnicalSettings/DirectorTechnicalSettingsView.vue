<template>
  <TheDirectorHeader />
  <div class="w-full flex">
    <TheDirectorMenu />
    <div class="flex flex-col w-full">
      <div :class="{'w-[calc(100%+30px)] translate-x-[-30px]': directorBaseStore.isMenuActive}" class="w-full flex justify-center items-center bg-red text-2xl text-white font-medium h-[50px]">
        Изменения вступят в силу начиная с 25 июня 2023 г.
      </div>
      <section
        :class="{ 'pl-[122px]': !directorBaseStore.isMenuActive }"
        class="mt-10 flex flex-1"
      >
        <div class="flex flex-col">
          <h1 class="text-4xl font-medium">Технические настройки</h1>
          <div class="text-2xl font-medium mt-5">Режим работы</div>
          <div class="flex flex-col mt-4">
            <div class="flex items-center">
              <BaseRadioButton :is-active="false" />
              <span class="text-lg ml-2">Без записи, только живая очередь</span>
            </div>
            <div class="flex items-center mt-3">
              <BaseRadioButton :is-active="true" />
              <span class="text-lg ml-2">Режим записи</span>
            </div>
          </div>
          <div class="flex mt-6">
            <div class="flex flex-col">
              <span class="text-lg font-semibold">Время начала работы</span>
              <input
                class="input-regular mt-3"
                type="text"
                placeholder="08:00"
              />
            </div>
            <div class="flex flex-col ml-8">
              <span class="text-lg font-semibold">Время окончания работы</span>
              <input
                class="input-regular mt-3"
                type="text"
                placeholder="20:00"
              />
            </div>
          </div>
          <div class="flex flex-col mt-10">
            <span class="text-2xl font-medium">Часовой пояс</span>
            <BaseSelectTimezone class="mt-3" />
          </div>
          <div class="flex flex-col mt-10">
            <span class="text-2xl font-medium">Техническая оснащённость постами</span>
            <input
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
import { useDirectorBaseStore } from '@/stores/director/directorBase.js';
import BaseRadioButton from '@/components/BaseRadioButton.vue';
import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
import BaseSelectTimezone from '@/components/BaseSelectTimezone.vue';

const directorBaseStore = useDirectorBaseStore();
</script>

<template>
  <div class="flex flex-col w-[276px] h-[calc(100vh-60px)] bg-gray-2c2d2f">
    <div class="w-full flex flex-col pt-[10px]">
      <div
        class="flex justify-between items-center border-b-gray-53565b border-b cursor-pointer py-[30px] pl-[30px] pr-[20px]"
      >
        <span class="text-white text-xl">Управление</span>
        <BaseSvgIcon
          name="arrow-down-white"
          class="w-[20px] h-[12px]"
        />
      </div>
      <div
        class="flex justify-between items-center border-b-gray-53565b border-b cursor-pointer py-[30px] pl-[30px] pr-[20px]"
      >
        <span class="text-white text-xl">Аналитика</span>
        <BaseSvgIcon
          name="arrow-down-white"
          class="w-[20px] h-[12px]"
        />
      </div>
      <div
        class="flex justify-between items-center border-b-gray-53565b border-b cursor-pointer py-[30px] pl-[30px] pr-[20px]"
      >
        <span class="text-white text-xl">Отчеты</span>
        <BaseSvgIcon
          name="arrow-down-white"
          class="w-[20px] h-[12px]"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
</script>

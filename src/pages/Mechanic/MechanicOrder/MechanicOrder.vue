<template>
  <BaseModalConfirm v-if="false" />
  <TheHeader />
  <section class="flex flex-col container lg:container mt-[60px] mb-10 h-[calc(100vh-160px)]">
    <div class="w-full flex">
      <span class="flex flex-1 border border-gray-a1a4ad text-5xl text-black pl-[30px] pr-[30px] py-9 leading-none">
        Заказ МВ892Х
      </span>
      <div class="relative pt-5 pb-5 flex flex-col items-center justify-center w-[242px] bg-gray-2c2d2f">
        <div class="relative flex w-full justify-center items-center">
          <SvgIcon name="watch" class="absolute left-5 w-[20px] h-[20px]" />
          <span class="text-white font-medium">Начало работы</span>
        </div>
        <span class="font-light text-5xl text-white">13:20</span>
        <span class="text-gray-a1a4ad text-sm">26 октября, четверг</span>
      </div>
      <div class="pt-5 pb-5 flex flex-col justify-center items-center bg-red-light w-[280px] border-red border">
        <div class="flex flex-col w-fit items-start">
          <div class="relative flex items-center">
            <SvgIcon name="time-running-out" class="absolute -left-7 w-[20px] h-[20px]" />
            <span class="text-red font-medium text-left">Осталось</span>
          </div>
          <span class="text-red text-5xl mb-[20px]">-12 мин</span>
        </div>
      </div>
    </div>
    <div class="w-full border border-gray-a1a4ad mt-10">
      <div class="bg-gray-f5f5f5">
        <div class="text-gray-a1a4ad px-[30px] py-4">Список услуг в заказе</div>
      </div>
      <div class="flex items-center justify-between px-[30px] border-t h-[80px] border-gray-a1a4ad">
        <span class="text-black text-2xl">wefwfe</span>
        <SvgIcon @click="removeService" name="trash-bin" class="w-[22px] h-[25px] cursor-pointer"></SvgIcon>
      </div>
      <div class="flex items-center justify-between px-[30px] border-t h-[80px] border-gray-a1a4ad">
        <span class="text-black text-2xl">wefwefwef</span>
        <SvgIcon @click="removeService" name="trash-bin" class="w-[22px] h-[25px] cursor-pointer"></SvgIcon>
      </div>
    </div>
    <div class="flex mt-auto">
      <button class="flex flex-1 justify-center items-center border border-green cursor-pointer py-5">
        <SvgIcon name="plus-in-circle" class="w-[26px] h-[26px] lg:w-[18px] lg:h-[18px]" />
        <span class="font-semibold text-[21px] ml-4 text-green lg:!text-base lg:ml-3">Добавить услугу</span>
      </button>
      <BaseButton class="flex-1 ml-4 mr-4 !text-[21px] bg-green text-white !px-0 lg:!text-base">Начать выполнение</BaseButton>
      <button v-if="false" class="flex flex-1 justify-center items-center border border-red">
        <span class="text-red font-semibold text-[21px]">Введите пробег, км</span>
        <SvgIcon name="warning-sign-in-triangle" class="w-[26px] h-[26px]" />
      </button>
      <button class="flex flex-1 justify-center items-center bg-gray-2c2d2f cursor-pointer py-5">
        <span class="text-white font-semibold text-[21px] mr-4 lg:!text-base lg:mr-3">Следующий заказ</span>
        <SvgIcon name="arrow-right-in-circle" class="w-[26px] h-[26px] lg:w-[18px] lg:h-[18px]" />
      </button>
    </div>
  </section>
</template>
<script setup>
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import BaseModalConfirm from '@/components/BaseModalConfirm/BaseModalConfirm.vue'
// import MechanicOrderWork from '@/pages/Mechanic/MechanicOrder/components/MechanicOrderWork.vue'

function removeService(event) {
  event.target.closest()
};
</script>
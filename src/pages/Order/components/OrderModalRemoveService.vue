<template>
  <section class="z-50 flex justify-center items-center absolute w-full h-screen left-0 top-0 bg-gray-848484">
    <div class="flex flex-col items-center bg-white w-[520px] h-[288px]">
      <div class="flex flex-col items-center mt-[70px] mb-[60px]">
        <div class="font-medium text-3xl">Удалить услугу из заказа?</div>
        <div class="text-lg mt-6">Вы можете её снова включить в заказ</div>
      </div>
      <div class="flex w-full mt-auto">
        <BaseButton class="flex-1 bg-red text-white">Да, удалить</BaseButton>
        <BaseButton class="flex-1 bg-gray-f5f5f5 text-black">Отмена</BaseButton>
      </div>
    </div>
  </section>
</template>
<script setup>
import BaseButton from '@/components/BaseButton/BaseButton.vue'
</script>
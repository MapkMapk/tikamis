<template>
  <TheHeader/>
  <section class="flex flex-col items-center bg-gray-f5f5f5 h-[calc(100vh-theme(height.the-header))] pb-6">
    <div class="mt-[40px] text-center text-4xl leading-[48px] font-medium">Предоставьте этот QR код на кассу,<br> если у клиента не работает приложение</div>
    <div class="w-[438px] flex flex-col items-center h-full">
      <div class="h-full w-[438px] bg-white border-l border-r border-t border-gray-c8c8c8 mt-6">
        <SvgIcon name="qr-demo" class="w-full h-full"/>
      </div>
      <BaseButton class="bg-gray-2c2d2f text-white w-full text-lg font-semibold">Закрыть</BaseButton>
    </div>
  </section>
</template>
<script setup>
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
</script>
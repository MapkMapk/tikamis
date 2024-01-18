<template>
  <TheHeader />
  <section
    class="flex flex-col items-center bg-gray-f5f5f5 h-[calc(100vh-theme(height.the-header))] pb-6"
  >
    <h1 class="mt-[40px] text-center text-4xl leading-[48px] font-medium">
      Предоставьте этот QR код на кассу,<br />
      если у клиента не работает приложение
    </h1>
    <div class="w-[438px] flex flex-col items-center h-full">
      <div class="h-full w-[438px] bg-white border-l border-r border-t border-gray-c8c8c8 mt-6">
        <BaseSvgIcon
          name="qr-demo"
          class="w-full h-full"
        />
      </div>
      <BaseButtonFilledDark>Закрыть</BaseButtonFilledDark>
      >
    </div>
  </section>
</template>
<script setup>
import TheHeader from '@/components/TheMechanicHeader.vue';
import BaseButtonFilledDark from '@/components/BaseButtonFilledDark.vue';
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
</script>

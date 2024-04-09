<template>
    <section
      v-if="props.isVisible"
      class="z-50 flex justify-center items-center fixed w-full h-screen left-0 top-0 bg-gray-848484"
    >
      <div class="flex flex-col items-center bg-white w-[520px]">
        <div class="flex flex-col items-center mt-[70px] mb-[40px] pl-10 pr-10 text-center">
          <span class="font-medium text-3xl text-red-500">Имеется запись</span>
          <span class="text-lg mt-[25px] leading-7 texttexttext">На 8 июня имеется запись. Изменить численность постов невозможно.</span>
        </div>
        <div class="flex w-full mt-auto">
          <BaseButtonFilledLight
            @click="emit('callback', false)"
            class="flex-1"
            >Закрыть
          </BaseButtonFilledLight>
        </div>
      </div>
    </section>
  </template>
  <script setup>
  import BaseButtonFilledLight from '@/components/BaseButtonFilledLight.vue';
  import { ref } from 'vue';
  
  let emit = defineEmits(['callback']);
  let props = defineProps({
    isVisible: Boolean,
    mainTitle: String,
    mainText: String,
    primaryButtonComponent: Object,
    primaryCountText: String,
    primaryButtonText: String,
    secondaryButtonText: String
  });
  </script>
  <style>
.text-red-500{color:red;}
.texttexttext{
    font-family: Inter;
font-size: 18px;
font-weight: 500;
line-height: 28px;
text-align: center;
color:#080808;
}
</style>
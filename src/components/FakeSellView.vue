<template>
  <section v-if="isVisible" class="flex flex-row justify-center items-center fixed px-[120px] py-[42px] w-full h-screen left-0 top-[60px] bg-white-ffffff">
    <div class="flex self-start flex-col justify-between items-start h-full w-1/2">
      <span class="flex justify-start text-left text-4xl font-medium">Предпросмотр <br/>в мобильной версии</span>
      <div class="w-full pr-[40%] pb-[40px]">
        <BaseButtonFilledLight @click="close" class="w-full">Назад</BaseButtonFilledLight>
        <BaseButtonFilledGreen @click="save" class="w-full mt-[20px]">Сохранить</BaseButtonFilledGreen>
      </div>
    </div>
    <div class="flex self-start flex-col justify-start items-center w-1/2">
      <div class="bg-white w-[375px] h-[812px] border-2 border-black rounded-t-[44px] rounded-b-[12px]">
        <div class="h-[44px]">
          <!-- хеадер телефона-->
          <svg xmlns="http://www.w3.org/2000/svg" width="375" height="39" viewBox="0 1 375 39" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M79 0 L83.1837 0 C86.9988 0 88.9359 0 88.9799 6.32677 C89.1359 19.9749 99.5893 30.2772 113.3 30.2782 C167.374 30.2812 217.448 30.2802 271.522 30.2782 C285.433 30.2782 295.813 20.0814 296.006 6.24223 C296.059 2.40996 298.007 0 301.885 0.447578 C314.717 0. 329.548 0 342.379 0 C358.569 372.973 11.081 317.992 -1234" fill="black" />
          </svg>
        </div>
        <div class="flex flex-col content-center items-center h-[756px] mt-[12px]">
          <p class="title">{{ workName }}</p>
          <p class="sellText mt-[24px] mb-[16px]">Условия акции</p>
          <div class="w-[343px] h-[579px] rounded-[12px] flex content-center justify-center items-center" style="box-shadow: 0px 4px 20px 0px #00000026;">
            <p class="sellPrev w-[307px]">{{ fullSaleLore }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
import BaseButtonFilledLight from '@/components/BaseButtonFilledLight.vue';

const emit = defineEmits(['close', 'save']);
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: true
  },
  workName: {
    type: String,
    default: ''
  },
  saleText: {
    type: String,
    default: ''
  },
  saleNote: {
    type: String,
    default: ''
  }
});
const fullSaleLore = ref(`${props.saleText}\n${props.saleNote}`);
watch(() => [props.saleText, props.saleNote], ([newSaleText, newSaleNote]) => {
  fullSaleLore.value = `${newSaleText}\n${newSaleNote}`;
});

function close() {
  emit('close', false);
}
async function save() {
  // Отправляем сигнал родительскому компоненту для выполнения асинхронной функции
  emit('save', {
    saleText: props.saleText,
    saleNote: props.saleNote
  });
}
</script>

<style>
section {
  background: white;
}
.title {
  font-family: Inter;
  font-size: 26px;
  font-weight: 700;
  line-height: 32px;
  text-align: center;
  color: #58595b;
  width: 290px;
  word-wrap: break-word; /* Автоматический перенос длинного текста */
}
.sellText {
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
  color: #58595b;
}
.sellPrev {
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  width: 307px;
  text-align: center;
  /*white-space: normal | nowrap | pre | pre-line | pre-wrap */
  white-space: break-spaces; /* Перенос строк и пробелов */
}
</style>
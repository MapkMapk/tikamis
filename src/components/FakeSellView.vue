<template>
    <!--  h-[calc(100vh-theme('height.the-header')-theme('padding.10')-theme('margin.10'))]-->
    <section v-if="props.isVisible" class=" flex flex-row justify-center items-center fixed px-[120px] py-[42px] w-full h-screen left-0 top-[60px] bg-white-ffffff">
    <div class="flex self-start flex-col justify-between items-start h-full w-1/2">
      <span class="flex justify-start text-left text-4xl font-medium">Предпросмотр <br/>в мобильной версии</span>
      <div class="w-full pr-[40%] pb-[40px]">
      <BaseButtonFilledLight @click="emit('close', false)" class="w-full">Закрыть</BaseButtonFilledLight>
      <BaseButtonFilledGreen
        @click="emit('close', false)"
        class="w-full mt-[20px]"
        >Сохранить
      </BaseButtonFilledGreen>
        </div>
    </div>
    <div class="flex self-start flex-col justify-start items-center w-1/2">
        <div class="bg-white w-[375px] h-[812px] border-2 border-black rounded-t-[44px] rounded-b-[12px]">
            <div class="h-[44px]">
            <!-- хеадер телефона-->
            <svg xmlns="http://www.w3.org/2000/svg" width="375" height="39" viewBox="0 0 375 39" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M375 0.315294 65.1033 0.43067 78.1837 0.451557C81.9988 0.45653 83.9359 2.4776 83.9799 6.32677C84.1359 19.9749 94.5893 30.2772 108.3 30.2782C162.374 30.2812 212.448 30.2802 266.522 30.2782C280.433 30.2782 290.813 20.0814 291.006 6.24223C291.059 2.40996 293.007 0.452552 296.885 0.447578C309.717 0.431665 324.548 0.379944 337.379 0.462498C353.569 0.566933 367.973 11.081 372.992" fill="black"/>
            </svg>
            </div>
            <div class="flex flex-col content-center items-center h-[756px] mt-[12px] ">
                <p class="title">Замена масла <br/>в двигателе</p>
                <p class="sellText mt-[24px] mb-[16px]">Скидки на сервисное обслуживание</p>
                <div class="w-[343px] h-[579px] rounded-[12px] flex content-center justify-center items-center" style="box-shadow: 0px 4px 20px 0px #00000026;">
                    <p class="sellPrev w-[307px]">При покупке моторного масла в сети магазинов «ТИКАМИС» замена моторного масла производится по цене 50 рублей независимо от суммы покупки.<br/><br/>

                    Указанная стоимость по замене масла в двигателе действует при покупке не менее 4-х литров моторного масла и при наличии записи о такой покупке в кассовом чеке. <br/><br/>

                    Работы по обнулению интервала ТО автомобиля включены в стоимость замены масла в двигателе.</p>
                </div>
            </div>
        </div>
    </div>
    </section>
  </template>
  <script setup>
//   import MainHeader from '@/components/MainHeader.vue';
//   import MainHeaderGap from '@/components/MainHeaderGap.vue';
  import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
  import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
  import router from '@/router/index.js';
  import MechanicOrderWorkAddWork from '@/views/Mechanic/MechanicOrderWorkAdd/MechanicOrderWorkAddWork.vue';
  import MechanicOrderWorkAddCracker from '@/views/Mechanic/MechanicOrderWorkAdd/MechanicOrderWorkAddCracker.vue';
  import getQuantitativeDeclination from '@/utils/getQuantitativeDeclination.js';
  import { onMounted, ref, computed } from 'vue';
  import { useMainStore } from '@/stores/shared/main.js';
  import BaseButtonFilledLight from '@/components/BaseButtonFilledLight.vue';
  
  const DirectorApiAllWorks = useMainStore();
  let searchInputText = ref('');
  let works = ref([]);
  
  let amountOfSelectedWorks = computed(() => {
    let counter = 0;
    works.value.forEach((work) => {
      if (work.isSelected === true) {
        counter++;
      }
    });
    return counter;
  });
  function getRandomPrice() {
  const possiblePrices = [500, 1000, 1500];
  const randomIndex = Math.floor(Math.random() * possiblePrices.length);
  return possiblePrices[randomIndex];
}

  onMounted(async () => {
    let { works: originalWorks } = await DirectorApiAllWorks.workList();
    originalWorks.forEach((work) => {
      work.isSelected = false;
      work.price = getRandomPrice();
    });
    works.value = originalWorks;
  });
  
  function toggleWorkSelection(index) {
    works.value[index].isSelected = !works.value[index].isSelected;
  }
  
  function deactivateWork(index) {
    works.value[index].isSelected = false;
  }
  
  async function addWorksToOrder() {
    let allSelectedWorkIds = [];
    works.value.forEach((work) => {
      if (work.isSelected === true) {
        work.isSelected = false;
        allSelectedWorkIds.push(work.workId);
      }
    });
  }
  let emit = defineEmits(['close']);
  let props = defineProps({
        isVisible: {
            type: Boolean,
            default: true // Значение по умолчанию для isVisible
        }
    });

  </script>
  <style>
section{
background: white;}
.title {
font-family: Inter;
font-size: 26px;
font-weight: 700;
line-height: 32px;
text-align: center;
color:#58595B;
}
.sellText{
font-family: Inter;
font-size: 14px;
font-weight: 400;
line-height: 16px;
text-align: center;
color: #58595B;}
.sellPrev{
font-family: Inter;
font-size: 16px;
font-weight: 500;
line-height: 24px;
text-align: center;
}
</style>
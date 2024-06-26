<template>
  <MainHeader />
  <MainHeaderGap />
  <FakeSellView :is-visible="Fake.isVisible" @close="FakeClose" @save="SaveSell" :work-name="workName" :sale-text="saleTextEquipment" :sale-note="saleNoteEquipment" />

  <div class="w-full flex overflow-x-hidden">
    <div class="flex flex-col w-full">
      <div v-if="changesSince" :class="{ 'pl-[300px]': mainStore.isHeaderMenuOpen }" class="w-full flex justify-center items-center bg-red text-2xl text-white font-medium h-[50px]">
        Изменения вступят в силу начиная с {{ changesSinceFormatted }}
      </div>
      <section :class="{ 'pl-[300px]': mainStore.isHeaderMenuOpen }" class="pt-[20px] pl-[122px] flex flex-1 mr-[30px] mb-10">
        <form class="flex flex-col w-full">
          <h1 class="text-4xl leading-normal font-medium">{{ workName }}</h1>
          <div class="flex flex-col mt-10 w-full">
            <span class="text-lg font-semibold">Условия акции</span>
            <textarea v-model="saleTextEquipment" @input="updateCombinedText" class="base-input text-[18px] w-40 mt-3 py-[18px] px-[20px]" style="width: 1073px; min-height: 270px;" rows="1"></textarea>
          </div>
          <div class="flex flex-col mt-10 w-full">
            <span class="text-lg font-semibold">Примечание</span>
            <textarea v-model="saleNoteEquipment" @input="updateCombinedNote" class="base-input text-[18px] w-40 mt-3 py-[18px] px-[20px]" style="width: 1073px; min-height: 130px;" rows="1"></textarea>
          </div>
          <div class="w-[70%] flex flex-col items-center">
            <div class="w-full flex mt-10 mb-3">
              <BaseButtonFilledGreen @click.prevent="SaveSell({ saleText: saleTextEquipment, saleNote: saleNoteEquipment })" class="flex flex-1 mr-5">Сохранить</BaseButtonFilledGreen>
              <BaseButtonFilledLight v-if="isEnv('sadmin')" @click.prevent="FakeOpen" class="flex flex-1 mr-5">Предпросмотр</BaseButtonFilledLight>
              <BaseButtonFilledLight v-if="isEnv('sadmin')" @click.prevent="CloseSell" class="flex flex-1">Закрыть</BaseButtonFilledLight>
            </div>
            <BaseErrorText v-if="isRequestSuccess !== undefined && !isRequestSuccess">Ошибка! Один или несколько полей заполнены не верно</BaseErrorText>
            <BaseSuccessText v-if="isRequestSuccess !== undefined && isRequestSuccess">Успех! Запрос отправлен</BaseSuccessText>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';
import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
import BaseButtonFilledLight from '@/components/BaseButtonFilledLight.vue';
import BaseErrorText from '@/components/BaseErrorText.vue';
import BaseSuccessText from '@/components/BaseSuccessText.vue';
import FakeSellView from '@/components/FakeSellView.vue';
import { useMainStore } from '@/stores/shared/main.js';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router/index.js';
import isEnv from '@/utils/isEnv.js';
import { sadminApiClient } from '@/api/sadminApiClient';

const mainStore = useMainStore();
const route = useRoute();

let workDetails = JSON.parse(sessionStorage.getItem('workDetails')) || {};
console.log(workDetails);
const workName = ref(workDetails.name);
const saleTextEquipment = ref(workDetails.saleText || '');
const saleNoteEquipment = ref(workDetails.saleNote || '');

const changesSince = ref();
const changesSinceFormatted = computed(() => new Date(changesSince.value * 1000).getDate() + ' февраля');
const isRequestSuccess = ref(undefined);
const Fake = ref({ isVisible: false });


function updateCombinedText() {
  saleTextEquipment.value = `${saleTextEquipment.value}`;
}
function updateCombinedNote() {
  saleNoteEquipment.value = `${saleNoteEquipment.value}`;
}
function FakeClose() {
  Fake.value.isVisible = false;
}
function FakeOpen() {
  Fake.value.isVisible = true;
}

async function SaveSell({ saleText, saleNote }) {
  const workId = workDetails.id;
  const filter = {
    id: workId,
    saleText: saleText,
    saleNote: saleNote
  };

  try {
    const response = await sadminApiClient.post('manage/work-sale-text', filter);
    console.log('Данные успешно сохранены:', response);
    router.push({ path: '/sadmin/manage/works-description'});
    // Дополнительные действия при успешном сохранении
  } catch (error) {
    console.error('Ошибка при сохранении данных:', error);
    // Дополнительные действия при возникновении ошибки
  }
}

function CloseSell(){
  router.push({ path: '/sadmin/manage/works-description'});
}
</script>
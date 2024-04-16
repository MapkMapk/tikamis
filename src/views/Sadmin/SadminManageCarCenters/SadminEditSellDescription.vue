<template>
    <!-- <ModalBoolean
      @callback="modal.callback"
      :is-visible="modal.isVisible"
      :primary-button-component="BaseButtonFilledDark"
      :main-title="modal.mainTitle"
      :primary-button-text="modal.primaryButtonText"
      :secondary-button-text="modal.secondaryButtonText"
    /> -->
    <MainHeader />
    <MainHeaderGap />
    <FakeSellView
        :is-visible="modal.isVisible"
        @close="FakeClose"/>

    <div class="w-full flex overflow-x-hidden">
      <div class="flex flex-col w-full">
        <div
          v-if="changesSince"
          :class="{ 'pl-[300px]': mainStore.isHeaderMenuOpen }"
          class="w-full flex justify-center items-center bg-red text-2xl text-white font-medium h-[50px]"
        >
          Изменения вступят в силу начиная с {{ changesSinceFormatted }}
        </div>
        <section
          :class="{ 'pl-[300px]': mainStore.isHeaderMenuOpen }"
          class="pt-[20px] pl-[122px] flex flex-1 mr-[30px] mb-10"
        >
          <form class="flex flex-col w-full">
            <h1 class="text-4xl leading-normal font-medium">
            Замена масла в двигателе
              <!-- <br />{{ formattedFullAddress }} -->
            </h1>
            <div class="flex flex-col mt-10 w-full">
                <span class="text-lg font-semibold">Условия акции</span>
              <textarea
                v-model="saleTextEquipment"
                class="base-input text-[18px] w-40 mt-3 py-[18px] px-[20px]"
                style="width: 1073px; min-height: 270px;"
                rows="1"
              ></textarea>
            </div>
            <div class="flex flex-col mt-10 w-full">
                <span class="text-lg font-semibold">Примечание</span>
              <textarea
                v-model="saleNoteEquipment"
                class="base-input text-[18px] w-40 mt-3 py-[18px] px-[20px]"
                style="width: 1073px; min-height: 130px;"
                rows="1"
              ></textarea>
            </div>
            
            <div class="w-[70%] flex flex-col items-center">
              <div class="w-full flex mt-10 mb-3">
                <BaseButtonFilledGreen
                  @click.prevent="FakeOpen"
                  class="flex flex-1 mr-5"
                  >Сохранить</BaseButtonFilledGreen
                >
                <BaseButtonFilledLight
                  v-if="isEnv('sadmin')"
                  @click.prevent="FakeOpen"
                  class="flex flex-1 mr-5"
                  >Предпосмотр</BaseButtonFilledLight
                >
                <BaseButtonFilledLight
                  v-if="isEnv('sadmin')"
                  @click.prevent="FakeOpen"
                  class="flex flex-1"
                  >Закрыть</BaseButtonFilledLight
                >
              </div>
              <BaseErrorText v-if="isRequestSuccess !== undefined && !isRequestSuccess"
                >Ошибка! Один или несколько полей заполнены не верно</BaseErrorText
              >
              <BaseSuccessText v-if="isRequestSuccess !== undefined && isRequestSuccess"
                >Успех! Запрос отправлен</BaseSuccessText
              >
            </div>
        </form>
        </section>
      </div>
    </div>
  </template>
  <script setup>
  import MainHeader from '@/components/MainHeader.vue';
  import BaseRadioButton from '@/components/BaseRadioButton.vue';
  import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
  import SelectTimezone from '@/components/SelectTimezone.vue';
  import { useMainStore } from '@/stores/shared/main.js';
  import BaseButtonFilledLight from '@/components/BaseButtonFilledLight.vue';
  import isEnv from '@/utils/isEnv.js';
  import { computed, onBeforeMount, ref } from 'vue';
  import directorApiManageSettings from '@/api/director/directorApiManageSettings.js';
  import directorApiManageSettingsPost from '@/api/director/directorApiManageSettingsPost.js';
  import sadminApiManageSettings from '@/api/sadmin/sadminApiManageSettings.js';
  import sadminApiManageSettingsPost from '@/api/sadmin/sadminApiManageSettingsPost.js';
  import { useSadminServiceStationsStore } from '@/stores/sadmin/sadminServiceStations.js';
  import MainHeaderGap from '@/components/MainHeaderGap.vue';
  import BaseSuccessText from '@/components/BaseSuccessText.vue';
  import BaseErrorText from '@/components/BaseErrorText.vue';
  import ModalBoolean from '@/components/ModalBoolean.vue';
  import BaseButtonFilledDark from '@/components/BaseButtonFilledDark.vue';
  import router from '@/router/index.js';
  import minutesToHHMM from '@/utils/time/minutesToHHMM.js';
  import HHMMtoMinutes from '@/utils/time/HHMMtoMinutes.js';
  import directorApiCenterInfo from '@/api/director/directorApiCenterInfo.js';
  import FakeSellView from '@/components/FakeSellView.vue';

  const mainStore = useMainStore();
  
  let login = ref();
  let password = ref();
  let changesSince = ref();
  let changesSinceFormatted = computed(
    () => new Date(changesSince.value * 1000).getDate() + ' февраля'
  );
  let bookingAvailable = ref(false);
  let postsEquipment = ref();
  let saleTextEquipment = ref("При покупке моторного масла в сети магазинов “ТИКАМИС” замена моторного масла производится по цене 50 рублей независимо от суммы покупки.\n\nУказанная стоимость по замене масла в двигателе действует при покупке не менее 4-х литров моторного масла и при наличии записи о такой покупке в кассовом чеке.\n\nДля получения скидки сканируйте в сервисном центре QR-код кассового чека на товары, приобретенные в магазинах Тикамис.");
  let saleNoteEquipment = ref("Работы по обнулению интервала ТО автомобиля включены в стоимость замены масла в двигателе.");
  let shiftsFinish = ref();
  let shiftsStart = ref();
  let timezoneOffsetHours = ref();
  let orderDepthDays = ref();
  let clearanceMinutes = ref();
  let isRequestSuccess = ref();
  let formattedFullAddress = ref();
  
  const Fake = ref({})

  function FakeClose(){modal.value.isVisible = false;}
  function FakeOpen(){modal.value.isVisible = true;}
  let modal = ref({});
  
  function emitSetTimezone(value) {
    timezoneOffsetHours.value = value;
  }
  
  onBeforeMount(async () => {
    if (isEnv('director')) {
      const centerInfo = await directorApiCenterInfo();
      formattedFullAddress.value = centerInfo.city + ', ' + centerInfo.addressName;
  
      const data = await directorApiManageSettings();
      bookingAvailable.value = data.bookingAvailable;
      postsEquipment.value = data.postsEquipment;
      shiftsStart.value = minutesToHHMM(data.shiftsStart);
      shiftsFinish.value = minutesToHHMM(data.shiftsFinish);
      changesSince.value = data.changesSince;
      timezoneOffsetHours.value = data.timeZoneOffsetHours;
    }
  
    if (isEnv('sadmin')) {
      const sadminServiceStationsStore = useSadminServiceStationsStore();
      formattedFullAddress.value =
        sadminServiceStationsStore.getSelectedServiceStation().city +
        ', ' +
        sadminServiceStationsStore.getSelectedServiceStation().addressName;
  
      const data = await sadminApiManageSettings(router.currentRoute.value.query.id);
      login.value = data.login;
      password.value = data.password;
      bookingAvailable.value = data.bookingAvailable;
      postsEquipment.value = data.postsEquipment;
      shiftsStart.value = minutesToHHMM(data.shiftsStart);
      shiftsFinish.value = minutesToHHMM(data.shiftsFinish);
      changesSince.value = data.changesSince;
      timezoneOffsetHours.value = data.timeZoneOffsetHours;
      clearanceMinutes.value = data.clearanceMinutes;
      orderDepthDays.value = data.orderDepthDays;
    }
  });
  </script>
  
<template>
  <ModalBoolean 
    @callback="pageSave" 
    :is-visible="saveModal.isVisible && !isLoading"
    :primary-button-component="BaseButtonFilledDark" 
    :main-title="saveModal.mainTitle"
    :primary-button-text="saveModal.primaryButtonText" 
    :secondary-button-text="saveModal.secondaryButtonText" />
    <ModalBoolean 
    @callback="pageClose" 
    :is-visible="closeModal.isVisible"
    :primary-button-component="BaseButtonFilledDark" 
    :main-title="closeModal.mainTitle"
    :primary-button-text="closeModal.primaryButtonText" 
    :secondary-button-text="closeModal.secondaryButtonText" />
  <MainHeader />
  <MainHeaderGap />
  <div class="w-full flex overflow-x-hidden">
    <div class="flex flex-col w-full">
      <div v-if="changesSince" :class="{ 'pl-[300px]': mainStore.isHeaderMenuOpen }"
        class="w-full flex justify-center items-center bg-red text-2xl text-white font-medium h-[50px]">
        Изменения вступят в силу начиная с {{ changesSinceFormatted }}
      </div>
      <div class="hidden">
        <span class="hidden"></span>
        <input class="hidden" type="password" />
      </div>
      <section :class="{ 'pl-[300px]': mainStore.isHeaderMenuOpen }"
        class="pt-[20px] pl-[122px] flex flex-1 mr-[30px] mb-10">
        <form class="flex flex-col w-full max-w-[540px]">

          <h1 class="text-4xl leading-normal font-medium">
            Технические настройки
          </h1>
          <h1 v-if="isEnv('sadmin')" class="flex flex-col mt-2 w-full max-w-full">{{
            city +
            ', ' +
            address
            }}</h1>
          <div v-if="isEnv('sadmin')" class="flex flex-col mt-10 w-full max-w-full">
            <div class="flex w-full">
              <div class="flex flex-col mr-5 w-full">
                <span class="text-lg font-semibold">Логин директора</span>
                <input v-model="login" class="base-input text-2xl w-full mt-3" type="text" autocomplete="off" />
              </div>
              <div class="flex flex-col w-full">
                <span class="text-lg font-semibold">Пароль директора</span>
                <div class="relative w-full">
                  <input v-model="password" :type="passwordInputType" class="base-input text-2xl w-full mt-3"
                    autocomplete="off" />
                  <button type="button" @click="isPasswordVisible = !isPasswordVisible"
                    class="absolute inset-y-0 right-0 w-12 h-full flex items-center justify-center pt-3">
                    <BaseSvgIcon :name="'password-eye'"
                      class="w-6 h-6 cursor-pointer transition-all"></BaseSvgIcon>
                  </button>
                </div>
              </div>
            </div>
            <div class="flex mt-5">
              Изменение логина или пароля приведёт к отключению<br />
              аккаунта с предыдущими данными.<br />
              Изменения вступят в силу сразу.
            </div>
          </div>
          <div class="text-2xl font-medium mt-5">Режим работы</div>
          <div class="flex flex-col mt-4">
            <div @click="bookingAvailable = false" class="flex items-center cursor-pointer">
              <BaseRadioButton :is-active="!bookingAvailable" />
              <span class="text-lg ml-2">Без записи, только живая очередь</span>
            </div>
            <div @click="bookingAvailable = true" class="flex items-center cursor-pointer mt-3">
              <BaseRadioButton :is-active="bookingAvailable" />
              <span class="text-lg ml-2">Режим записи</span>
            </div>
          </div>
          <div v-if="bookingAvailable" class="flex mt-6">
            <div class="flex flex-col">
              <span class="text-lg font-semibold">Время начала работы</span>
              <input v-model="shiftsStart" v-mask="'##:##'" class="base-input text-2xl w-full mt-3" type="text" />
            </div>
            <div class="flex flex-col ml-8">
              <span class="text-lg font-semibold">Время окончания работы</span>
              <input v-model="shiftsFinish" v-mask="'##:##'" class="base-input text-2xl w-full mt-3" type="text" />
            </div>
          </div>
          <div v-if="bookingAvailable" class="flex flex-col mt-10">
            <span class="text-2xl font-medium">Часовой пояс</span>
            <SelectTimezone @set-time-zone="emitSetTimezone" :timezone-offset-hours="timezoneOffsetHours"
              class="mt-3" />
          </div>
          <div class="flex flex-col mt-10">
            <span class="text-2xl font-medium">Техническая оснащённость постами</span>
            <input v-model="postsEquipment" type="number" class="base-input text-2xl w-40 mt-3" />
          </div>
          <div v-if="isEnv('sadmin')" class="flex flex-col mt-10">
            <span class="text-2xl font-medium">Производственный люфт</span>
            <span class="text-lg mt-3 mb-3">Установка значения перерыва между обслуживанием автомобилей на посту, в
              минутах.</span>
            <input v-model="clearanceMinutes" type="number" class="base-input text-2xl w-40 mt-3" />
          </div>
          <div v-if="isEnv('sadmin')" class="flex flex-col mt-10">
            <span class="text-2xl font-medium">Установка глубины записи в днях</span>
            <input v-model="orderDepthDays" type="number" class="base-input text-2xl w-40 mt-3" />
          </div>
          <div class="flex flex-col mt-10">
            <span class="text-2xl font-medium">Ссылка на карту</span>
            <input v-model="mapLink" class="base-input text-2xl w-40 mt-3" style="width: 520px;" />
          </div>
          <div class="flex flex-col items-center">
            <div class="w-full flex mt-10 mb-3">
              <BaseButtonFilledGreen @click.prevent="saveModalShow" class="flex flex-1 mr-5">Сохранить
              </BaseButtonFilledGreen>
              <BaseButtonFilledLight v-if="isEnv('sadmin')" @click.prevent="closeModalShow" class="flex flex-1">Закрыть
              </BaseButtonFilledLight>
            </div>
            <BaseErrorText v-if="isRequestSuccess !== undefined && !isRequestSuccess">Ошибка! Один или несколько полей
              заполнены не верно</BaseErrorText>
            <BaseSuccessText v-if="isRequestSuccess !== undefined && isRequestSuccess">Успех! Запрос отправлен
            </BaseSuccessText>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>
<script setup>
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
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
import {unixToShortDate, minutesToHHMM,HHMMtoMinutes} from '@/utils/time/dateUtils.js';
import directorApiCenterInfo from '@/api/director/directorApiCenterInfo.js';
import { directorApiClient } from '@/api/directorApiClient';
import { sadminApiClient } from '@/api/sadminApiClient';
const apiClient = isEnv('sadmin') ? sadminApiClient : directorApiClient;

const sadminStationsStore = useSadminServiceStationsStore();
const mainStore = useMainStore();

let login = ref();
let address = ref();
let city = ref();
let password = ref();
let changesSince = ref();
let changesSinceFormatted = computed(
  () => unixToShortDate(changesSince.value)
);
let bookingAvailable = ref(false);
let postsEquipment = ref();
let mapLink = ref();
let shiftsFinish = ref();
let shiftsStart = ref();
const timezoneOffsetHours = ref();
let orderDepthDays = ref();
let clearanceMinutes = ref();
let isRequestSuccess = ref();
let formattedFullAddress = ref();
let isPasswordVisible = ref(false);
let passwordInputType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));



const saveModal = ref({});
async function predictChanges() {
  let response;
  if (isEnv('sadmin')) {
    let responeBody = {
      carCenterId: router.currentRoute.value.query.id,
      login: login.value,
      password: password.value,
      bookingAvailable: bookingAvailable.value,
      postsEquipment: postsEquipment.value,
      shiftsStart: HHMMtoMinutes(shiftsStart.value),
      shiftsFinish: HHMMtoMinutes(shiftsFinish.value),
      timeZoneOffsetHours: timezoneOffsetHours.value,
      clearanceMinutes: clearanceMinutes.value,
      orderDepthDays: orderDepthDays.value,
      mapLink: mapLink.value
    };
    response = await apiClient.post('/manage/get-change-predict', responeBody);
  } else if (isEnv('director')) {
    let responeBody = {
      bookingAvailable: bookingAvailable.value,
      postsEquipment: postsEquipment.value,
      shiftsStart: HHMMtoMinutes(shiftsStart.value),
      shiftsFinish: HHMMtoMinutes(shiftsFinish.value),
      timeZoneOffsetHours: timezoneOffsetHours.value,
      mapLink: mapLink.value
    };
    response = await apiClient.post('/manage/get-change-predict', responeBody);
  }

  if (!response.data.since) {
    return "сразу";
  }

  return unixToShortDate(response.data.since);
}


let isLoading = ref(false);

async function saveModalShow() {
  isLoading.value = true;
  const predictChangesDate = await predictChanges();
  isLoading.value = false;

  saveModal.value.isVisible = true;
  saveModal.value.mainTitle = `Настройки будут применены ${predictChangesDate}. Продолжить?`;
  saveModal.value.primaryButtonText = 'Продолжить';
  saveModal.value.secondaryButtonText = 'Отмена';
}

  async function pageSave(data) {
    if(data){
      let response;
      // Sadmin
      if (isEnv('sadmin')) {
        let responeBody = {
        carCenterId: router.currentRoute.value.query.id,
        login: login.value,
        password: password.value,
        bookingAvailable: bookingAvailable.value,
        postsEquipment: postsEquipment.value,
        shiftsStart: HHMMtoMinutes(shiftsStart.value),
        shiftsFinish: HHMMtoMinutes(shiftsFinish.value),
        timeZoneOffsetHours: timezoneOffsetHours.value,
        clearanceMinutes: clearanceMinutes.value,
        orderDepthDays: orderDepthDays.value,
        mapLink: mapLink.value
        }
        response = await sadminApiManageSettingsPost(responeBody)
      }
      // Director
      if (isEnv('director')) {
        let responeBody = {
          bookingAvailable: bookingAvailable.value,
          postsEquipment: postsEquipment.value,
          shiftsStart: HHMMtoMinutes(shiftsStart.value),
          shiftsFinish: HHMMtoMinutes(shiftsFinish.value),
          timeZoneOffsetHours: timezoneOffsetHours.value,
          mapLink: mapLink.value
        }
        response = await directorApiManageSettingsPost(responeBody);
      }
      if (response.status === 200) {
        isRequestSuccess.value = true;
      }
      if (response.status === 400) {
        isRequestSuccess.value = false;
      }
    }
    saveModal.value.isVisible = false;
  }

const closeModal = ref({});
function closeModalShow() {
  closeModal.value.callback = close;
  closeModal.value.isVisible = true;
  closeModal.value.mainTitle = 'Закрыть без сохранения?';
  closeModal.value.mainText = 'Настройки не будут применены';
  closeModal.value.primaryButtonText = 'Сохранить изменения';
  closeModal.value.secondaryButtonText = 'Закрыть без сохранения';
}
function pageClose(data) {
  closeModal.value.isVisible = false;
  if (!data){
    router.back();
  } 
}




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
    mapLink.value = data.mapLink;
    shiftsStart.value = minutesToHHMM(data.shiftsStart);
    shiftsFinish.value = minutesToHHMM(data.shiftsFinish);
    changesSince.value = data.changesSince;
    timezoneOffsetHours.value = data.timeZoneOffsetHours;
  }

  if (isEnv('sadmin')) {
    const sadminStationsStore = useSadminServiceStationsStore();
    console.log(sadminStationsStore);
    formattedFullAddress.value =
      sadminStationsStore.city +
      ', ' +
      sadminStationsStore.addressName;

    const data = await sadminApiManageSettings(router.currentRoute.value.query.id);
    address.value = data.address;
    city.value = data.city;
    login.value = data.login;
    password.value = data.password;
    bookingAvailable.value = data.bookingAvailable;
    postsEquipment.value = data.postsEquipment;
    shiftsStart.value = minutesToHHMM(data.shiftsStart);
    shiftsFinish.value = minutesToHHMM(data.shiftsFinish);
    changesSince.value = data.changesSince;
    mapLink.value = data.mapLink;
    timezoneOffsetHours.value = data.timeZoneOffsetHours;
    clearanceMinutes.value = data.clearanceMinutes;
    orderDepthDays.value = data.orderDepthDays;
  }
});
</script>
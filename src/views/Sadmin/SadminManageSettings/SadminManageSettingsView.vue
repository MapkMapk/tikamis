<template>
  <ModalBoolean @callback="modal.callback" :is-visible="modal.isVisible"
    :primary-button-component="BaseButtonFilledDark" :main-title="modal.mainTitle"
    :primary-button-text="modal.primaryButtonText" :secondary-button-text="modal.secondaryButtonText" />
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
                  <input v-model="password" :type="passwordFieldType" class="base-input text-2xl w-full mt-3"
                    autocomplete="off" />
                  <button type="button" @click="togglePasswordVisibility"
                    class="absolute inset-y-0 right-0 px-3 flex items-center">
                    <svg v-if="passwordFieldType === 'password'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13.875 18.825a7.5 7.5 0 01-7.497-7.499m14.997 0a7.5 7.5 0 01-7.497 7.499M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.757 5 12 5c4.243 0 8.268 2.943 9.542 7-.296.938-.719 1.82-1.252 2.614m-1.82 2.757a10.937 10.937 0 01-6.47 2.131A10.937 10.937 0 014.73 17.99M15.37 12c-.363.806-.862 1.544-1.465 2.143m-1.638 1.307A5.972 5.972 0 0112 15c-1.505 0-2.91.547-4.002 1.45">
                      </path>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.757 5 12 5c4.243 0 8.268 2.943 9.542 7-.296.938-.719 1.82-1.252 2.614m-1.82 2.757A10.937 10.937 0 0112 19c-4.243 0-8.268-2.943-9.542-7 .296-.938.719-1.82 1.252-2.614M15.37 12c-.363.806-.862 1.544-1.465 2.143m-1.638 1.307A5.972 5.972 0 0112 15c-1.505 0-2.91.547-4.002 1.45">
                      </path>
                    </svg>
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
              <BaseButtonFilledGreen @click.prevent="saveModal" class="flex flex-1 mr-5">Сохранить
              </BaseButtonFilledGreen>
              <BaseButtonFilledLight v-if="isEnv('sadmin')" @click.prevent="closeModal" class="flex flex-1">Закрыть
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
const sadminStationsStore = useSadminServiceStationsStore();
const mainStore = useMainStore();

let login = ref();
let address = ref();
let city = ref();
let password = ref();
let changesSince = ref();
let changesSinceFormatted = computed(
  () => new Date(changesSince.value * 1000).getDate() + ' февраля'
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


let passwordFieldType = ref('password');

// Метод для переключения видимости пароля
function togglePasswordVisibility() {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
}
let modal = ref({});

function saveModal() {
  modal.value.callback = save;
  modal.value.isVisible = true;
  modal.value.mainTitle = 'Настройки будут применены 25 июня. Продолжить?';
  modal.value.primaryButtonText = 'Продолжить';
  modal.value.secondaryButtonText = 'Отмена';

  async function save() {
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
      response = await directorApiManageSettingsPost({ newSettings: responeBody });
    }
    if (response.status === 200) {
      isRequestSuccess.value = true;
    }
    if (response.status === 400) {
      isRequestSuccess.value = false;
    }
    modal.value.isVisible = false;
  }
}

function closeModal() {
  modal.value.callback = close;
  modal.value.isVisible = true;
  modal.value.mainTitle = 'Закрыть без сохранения?';
  modal.value.mainText = 'Настройки не будут применены';
  modal.value.primaryButtonText = 'Сохранить изменения';
  modal.value.secondaryButtonText = 'Закрыть без сохранения';

  function close() {
    router.push('/');
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
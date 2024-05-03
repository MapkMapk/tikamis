<template>
    <div class="report-filter justify-between min-w-min" @click="simulateClickOnDatePicker">
      <div class="flex-col">
        <VueDatePicker :style="{ '.dp__overlay.dp--overlay-relative, .dp__overlay_container.dp__container_flex': { height: 'auto' } }"
        v-model="month" :format="customFormat" :start-date="startDate" focus-start-date month-picker auto-apply @update:modelValue="handleSelectedDate" locale="ru" :enable-time-picker="false" id="DatePickerPTPRO" />
      </div>
      <BaseSvgIcon
        class="max-w-[18px] max-h-[18px]"
        name="calendar-gray"
      />
    </div>
  </template>
  
  
  <script setup>
  import { ref } from 'vue';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
  
  const month = ref({
    month: new Date(2023, 1, 8).getMonth(),
    year: new Date(2023, 1, 8).getFullYear()
    });
  const startDate = new Date(2023, 1, 8);
  const customFormat = date => `${getMonthName(date.getMonth() + 1)} / ${date.getFullYear()}`;
  
  
  function getMonthName(monthNumber) {
    const months = [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ];
    return months[monthNumber - 1];
  }
  
  function toggleDatepicker() {
    month.value = {
    month: new Date(2023, 1, 8).getMonth(),
    year: new Date(2023, 1, 8).getFullYear()
    }
  }
  
  const emits = defineEmits(['updateDate']);
  
  function handleSelectedDate(date) {
    month.value = date;
    const { month, year } = date;
    const unixTime = Math.floor(new Date(year, month).getTime() / 1000);
    emits('updateDate', unixTime);
  }
  function updateSelectedDate(date) {
  emits('updateDate', Math.floor(date.getTime() / 1000)); // Отправляем timestamp
  }
  </script>
  <style>
  .dp__icon.dp__input_icon.dp__input_icons,
  .dp__icon.dp__clear_icon.dp__input_icons { display: none; }
  .dp__pointer.dp__input_readonly.dp__input.dp__input_icon_pad.dp__input_reg {
      padding-inline-start: 0;
      border-style: none;
  }
  .dp__instance_calendar{font-size: 20px;}
  :root {
      --dp-font-family: "Inter";
      --dp-font-size: 24px;
  }
  </style>
  
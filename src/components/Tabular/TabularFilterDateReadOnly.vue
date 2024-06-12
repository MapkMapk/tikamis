<template>
    <div class="report-filter justify-between min-w-min flex-1">
      <div class="flex-col">
        <VueDatePicker v-model="convertedDate" :format="customFormat" locale="ru" :enable-time-picker="false" readonly class="datePickerReadOnly" />
      </div>
      <BaseSvgIcon
        class="max-w-[18px] max-h-[18px]"
        name="calendar-gray"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps } from 'vue';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
  
  const customFormat = date => `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;

  
  let props = defineProps({
  unixDate: {
    type: Number,
    required: true,
    default: Math.floor(new Date('2007-02-13T00:00:00Z').getTime() / 1000)
  }
});
  
  // Функция для конвертации UNIX timestamp в объект Date
  const convertUnixToDate = (unixTimestamp) => {
    return new Date(unixTimestamp * 1000); // Умножаем на 1000, так как время в JavaScript измеряется в миллисекундах
  };
  
  // Создание реактивной переменной, содержащей преобразованную дату
  const convertedDate = ref(convertUnixToDate(props.unixDate));
  </script>
  <style>
  .dp__icon.dp__input_icon.dp__input_icons,
  .dp__icon.dp__clear_icon.dp__input_icons { display: none; }
  input.dp__input_readonly.dp__input.dp__input_icon_pad.dp__input_reg {
      padding-inline-start: 0;
      border-style: none;
  }
  .dp__instance_calendar{font-size: 20px;}
  :root {
      --dp-font-family: "Inter";
      --dp-font-size: 24px;
  }
  </style>
  
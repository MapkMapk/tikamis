<template>
  <div class="report-filter justify-between min-w-min" @click="simulateClickOnDatePicker">
    <div class="flex-col">
      <VueDatePicker 
        v-model="selectedDate" 
        :format="customFormat" 
        :start-date="startDate" 
        month-picker 
        auto-apply 
        @update:modelValue="selectDateHandler" 
        locale="ru" 
        :enable-time-picker="false" 
        id="DatePickerPTPRO" 
      />
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

const months = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

const selectedDate = ref(new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth())));
const startDate = ref(new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth())));

const customFormat = date => `${months[date.getMonth()]} ${date.getFullYear()}`;

const emits = defineEmits(['updateDate']);
function convertToUnixTime(dateObj) {
  const { month, year } = dateObj;
  // Создаем объект Date с указанными годом и месяцем, устанавливая день на 1
  const date = new Date(Date.UTC(year, month, 1));
  // Преобразуем время в Unix время (в секундах)
  const unixTime = Math.floor(date.getTime() / 1000);
  return unixTime;
}
function selectDateHandler(date) {
  console.log(`date:`);
  console.log(date);
  const { month, year } = date;
  selectedDate.value = date;
  const unixTime = convertToUnixTime(selectedDate.value);
  console.log(`unixTime:`);
  console.log(unixTime);
  
  emits('updateDate', unixTime);
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

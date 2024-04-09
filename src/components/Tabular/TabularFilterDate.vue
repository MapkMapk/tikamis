<template>
  <div class="report-filter justify-between min-w-min flex-1" @click="simulateClickOnDatePicker">
    <div class="flex-col">
      <div v-if="isVisible" class="report-input-header-text-gray">Начало отсчета</div>
      <VueDatePicker v-model="selectedDate" :format="customFormat" :start-date="startDate" focus-start-date auto-apply @update:modelValue="updateSelectedDate" locale="ru" :enable-time-picker="false" id="DatePickerPTPRO" />
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

const selectedDate = ref(new Date(2023, 1, 8));
const emits = defineEmits(['updateDate']);

const customFormat = date => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
const startDate = ref(new Date(2023, 1, 8));



function updateSelectedDate(date) {
  emits('updateDate', Math.floor(date.getTime() / 1000)); // Отправляем timestamp
}

function simulateClickOnDatePicker() {
  const datePickerInput = document.getElementById('DatePickerPTPRO').querySelector('.dp__input_wrap');
  datePickerInput.click();
}


let props = defineProps({
        isVisible: {
            type: Boolean,
            default: true // Значение по умолчанию для isVisible
        },
    });
</script>

<script>
import { ref } from 'vue';

function simulateClickOnDatePicker() {
  const DatePickerPT1 = document.querySelector('#DatePickerPTPRO');
const DatePickerPT2 = DatePickerPT1.getElementsByTagName('div')[0];
const DatePickerPT3 = DatePickerPT2.querySelector('.dp__input_wrap'); // Исправлено на DatePickerPT1
DatePickerPT3.click();
}

export default {
  components: {
    //DatePickerComponent,
  },
  data() {
    return {
      date: new Date(), // This will hold the selected date
      isDatepickerVisible: false, // Controls visibility of the datepicker
    };
  },
  methods: {
    toggleDatepicker() {
      this.isDatepickerVisible = !this.isDatepickerVisible; // Toggle the visibility
    },
  },
  setup() {
    const selectedDate = ref(null); // Инициализирует реактивную переменную для хранения выбранной даты

    // Обработчик события 'selected'
    function handleSelectedDate(date) {
      selectedDate.value = date; // Установливает выбранную дату в реактивную переменную
    }

    return {
      selectedDate,
      handleSelectedDate,
    };
  },
};



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

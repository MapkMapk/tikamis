<template>
  <div class="report-filter justify-between min-w-min flex-1">
    <div class="flex-col">
      <div class="report-input-header-text-gray">Начало отсчета</div>
      <DatePickerComponent value="5.1.23" minimum-view="day" @selected="handleSelectedDate"/> 
    </div>
    <BaseSvgIcon
      class="max-w-[18px] max-h-[18px]"
      name="calendar-gray"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
import DatePickerComponent from '@/components/DatePicker/DatePickerComponent.vue';

const props = defineProps({
  initialDate: Date,
});

const emits = defineEmits(['selected']); 

const selectedDate = ref(props.initialDate);

function handleSelectedDate(date) {
  selectedDate.value = date;
  emits('selected', selectedDate.value); 
}
</script>

<script>
import { ref } from 'vue';

export default {
  components: {
    DatePickerComponent,
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
<template>
  <div class="report-filter flex-col items-start">
    <div class="report-input-header-text-gray">Свободные окошки</div>
    <div class="flex items-end mt-auto justify-start w-full">
      <input
        id="hours-input"
        type="number"
        class="w-[40px] text-2xl leading-none placeholder-black text-align-center"
        v-model="hours"
        @input="handleHoursInput"
        @blur="submitTime"
        placeholder="0"
        min="0"
        max="23"
      />
      <div class="text-gray-a1a4ad leading-none mb-0.5 pl-[15px] pr-[15px] lg:pl-1 lg:pr-1">ч</div>
      <input
        id="minutes-input"
        type="number"
        class="w-[40px] text-2xl leading-none text-green placeholder-green text-align-center"
        v-model="minutes"
        @input="handleMinutesInput"
        @blur="submitTime"
        placeholder="00"
        min="0"
        max="59"
      />
      <div class="text-gray-a1a4ad leading-none mb-0.5 pl-[15px] lg:pl-1">м</div>
    </div>
  </div>
</template>

<script setup>
// Определение emit с помощью defineEmits
const emit = defineEmits(['update-time']);

const hours = ref('');
const minutes = ref('');

const submitTime = () => {
  const totalMinutes = (parseInt(hours.value) || 0) * 60 + (parseInt(minutes.value) || 0);
  emit('update-time', totalMinutes);
};

// Обработка ввода часов с автоматическим переключением фокуса
const handleHoursInput = () => {
  const hValue = parseInt(hours.value);
  if (hValue > 1 || hours.value.length === 2) {
    document.getElementById('minutes-input').focus();
  }
};

// Обработка ввода минут и снятие фокуса
const handleMinutesInput = () => {
  const mValue = parseInt(minutes.value);
  if (mValue.toString().length === 2 || mValue >= 60) {
    minutes.value = Math.min(mValue, 59).toString();
    document.getElementById('minutes-input').blur();
  }
};

</script>
<script>
import { ref } from 'vue';

export default {
  setup(props, { emit }) {
    const hours = ref('');
    const minutes = ref('');

    // Функции, использующие emit
    const submitTime = () => {
      const totalMinutes = (parseInt(hours.value) || 0) * 60 + (parseInt(minutes.value) || 0);
      emit('update-time', totalMinutes);
    };

    return {
      hours,
      minutes,
      submitTime,
    };
  },
};
</script>


<style>
.text-align-center{
  text-align: center;
}
</style>
<template>
  <div class="report-filter justify-between min-w-min flex-1" @click="toggleDropdown" ref="dropdown">
    <div class="flex-col">
      <div class="report-input-header-text-gray">Период</div>
      <div class="report-input-body-text">{{ selectedOption }}</div>
      <!-- Вывод выпадающего списка -->
      <ul v-show="showDropdown" class="dropdown" v-click-outside="closeDropdown">
        <li @click="selectOption('День', 'day')">День</li>
        <li @click="selectOption('Неделя', 'week')">Неделя</li>
        <li @click="selectOption('Месяц', 'month')">Месяц</li>
        <li @click="selectOption('Год', 'year')">Год</li>
        <!--<li @click="selectOption('Всё время', 'null')">Всё время</li>-->
      </ul>
    </div>
    <BaseSvgIcon class="report-input-arrow-down-gray" name="arrow-down-gray"/>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps } from 'vue';
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';

const props = defineProps({
  optionSelected: Function
});

const showDropdown = ref(false);
const selectedOption = ref('Месяц');

// Функция для переключения видимости выпадающего списка
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
}

// Функция для выбора опции из списка
const selectOption = (option, value) => {
  selectedOption.value = option;
  showDropdown.value = true; // Скрыть выпадающий список после выбора опции
  props.optionSelected({ label: option, value: value });
}
// Функция для закрытия выпадающего списка при клике вне него
const closeDropdown = () => {
  showDropdown.value = false;
}

// Добавляем обработчики событий при монтировании и размонтировании компонента
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Обработчик события клика для закрытия списка при клике вне него
const handleClickOutside = (event) => {
  if (showDropdown.value && !event.target.closest('.report-filter')) {
    closeDropdown();
  }
}
</script>

<style scoped>
.dropdown {
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: absolute;
  margin-top: 12px;
  z-index: 1000;
}
.dropdown li {
  padding: 8px 12px;
  cursor: pointer;
}
</style>
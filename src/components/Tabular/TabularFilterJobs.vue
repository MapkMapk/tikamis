<template>
  <div class="report-filter justify-between flex-1" @click="toggleDropdown" ref="dropdown">
    <div class="flex-col">
      <div class="report-input-header-text-gray">Работы</div>
      <div class="report-input-body-text">{{ selectedOption }}</div>
      <!-- Вывод выпадающего списка с динамическими данными -->
      <ul v-show="showDropdown" class="dropdown" v-click-outside="closeDropdown">
        <li v-for="work in works" :key="work.id" @click="selectOption(work.name)">
          {{ work.name }}
        </li>
      </ul>
    </div>
    <BaseSvgIcon class="report-input-arrow-down-gray" name="arrow-down-gray" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
import directorApiAllworks from '@/api/director/directorApiAllworks.js';

const showDropdown = ref(false);
const selectedOption = ref('Все работы');
const works = ref([]);

// Функция для загрузки данных о работах
async function loadWorks() {
  try {
    const data = await directorApiAllworks();
    works.value = data;
  } catch (error) {
    console.error('Ошибка при получении данных о работах:', error);
  }
}

// Вызываем функцию загрузки данных при монтировании компонента
onMounted(loadWorks);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// Здесь могут быть функции closeDropdown и handleClickOutside, как в вашем изначальном примере
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
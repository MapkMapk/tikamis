<template>
  <div class="report-filter justify-between min-w-min flex-1" @click="toggleDropdown" ref="dropdownRef">
    <div class="flex-col">
      <div class="report-input-header-text-gray">Сортировать по</div>
      <div class="report-input-body-text">{{ selectedOption }}</div>
      <ul v-show="showDropdown" class="dropdown" v-click-outside="closeDropdown">
        <li @click.stop="selectOption('Механики', 'itemsByMechanics')">Механики</li>
        <li @click.stop="selectOption('Посты', 'itemsByPosts')">Посты</li>
      </ul>
    </div>
    <BaseSvgIcon class="report-input-arrow-down-gray" name="arrow-down-gray"/>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
import { defineEmits } from 'vue';


const emit = defineEmits(['optionSelected']);
const showDropdown = ref(false);
const selectedOption = ref('Механики');

const dropdownRef = ref(null);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
  
};

const closeDropdown = () => {
  showDropdown.value = false;
};

const selectOption = (text, value) => {
  selectedOption.value = text; // Обновляем для отображения текста
  showDropdown.value = false; // Скрываем dropdown
  emit('optionSelected', value); // Испускаем событие с техническим значением
  closeDropdown();
};



const handleClickOutside = (event) => {
  //if (!event.target.closest('.report-filter')) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
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
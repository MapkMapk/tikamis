<template>
    <div class="report-filter justify-between min-w-min flex-1" @click="toggleDropdown" ref="dropdownRef">
      <div class="flex-col">
        <div class="report-input-header-text-gray">Выберите работу</div>
        <div class="report-input-body-text">{{ selectedOptionName }}</div>
        <ul v-show="showDropdown" class="dropdown" v-click-outside="closeDropdown">
          <li v-for="work in works" :key="work.id" @click.stop="selectOption(work)">
            {{ work.name }}
          </li>
          <li @click.stop="selectOption({ id: 'all', name: 'Все' })">Все</li>
        </ul>
      </div>
      <BaseSvgIcon class="report-input-arrow-down-gray" name="arrow-down-gray"/>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, defineEmits, computed } from 'vue';
  import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
  import { sadminApiClient } from '@/api/sadminApiClient';
  import { directorApiClient } from '@/api/directorApiClient';
  import isEnv from '@/utils/isEnv.js';
  const apiCall = isEnv('sadmin') ? sadminApiClient : directorApiClient;
  const emit = defineEmits(['optionSelected', 'worksLoaded']);
  const works = ref([]);
  const showDropdown = ref(false);
  const selectedOption = ref({});
  const dropdownRef = ref(false);
  
  async function fetchOptions() {
    try {
      const response = await apiCall.get('/all-works');
      works.value = response.data.works;
      emit('worksLoaded', works.value.map(work => work.id)); // Передаем IDs всех работ
    } catch (error) {
      console.error('Ошибка загрузки работ:', error);
    }
  }
  
  onMounted(fetchOptions);
  
  const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
  };
  
  const selectOption = (work) => {
    selectedOption.value = work;
    showDropdown.value = false;
    if (work.id === 'all') {
      emit('optionSelected', works.value.map(w => w.id).join(','));
    } else {
      emit('optionSelected', work.id);
    }
  };
  
  const closeDropdown = () => {
    showDropdown.value = false;
  };
  
  const handleClickOutside = (event) => {
    if (!dropdownRef.value.contains(event.target)) {
      closeDropdown();
    }
  };
  
  onMounted(() => document.addEventListener('click', handleClickOutside));
  onUnmounted(() => document.removeEventListener('click', handleClickOutside));
  
  const selectedOptionName = computed(() => selectedOption.value.name || 'Выберите опцию');
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
  
<template>
    <div>
      <TabularSection>
        <slot name="tabular-title"></slot>
        <TabularFiltersWrapper>
            <TabularFilterPeriod v-if="showFilterPeriod !== false" @updatePeriod="handleUpdatePeriod" />
            <TabularFilterOr v-if="showFilterOr !== false" @optionSelected="handleOptionSelected" />
            <TabularFilterDate v-if="showFilterDate !== false" @updateDate="handleUpdateDate" />
            <TabularFilterAllWorks v-if="showFilterAllWorks !== false" @optionSelected="handleWorkSelected" @worksLoaded="handleWorksLoaded" />
            <TabularButtonCross v-if="showButtonCross !== false" @click="defaultFilters" />
            <TabularButtonApplyFilters v-if="showButtonApplyFilters !== false" @click="applyFilters" />

        </TabularFiltersWrapper>
      </TabularSection>
      <div class="w-full jjjj">
      <TabularTable class="tabletabletabletable" style="display: block; padding: 30px;">
        <slot name="tabular-table-header"></slot>
        <slot name="tabular-table-table"></slot>
      </TabularTable>
      </div>
    </div>
    <div v-if="showButtons!== false" class="flex flex-col items-center">
            <div id="234" class="w-full flex mt-10 mb-3" style="justify-content: center">
              <div style="width: 400px;margin-right: 20px;">
              <BaseButtonFilledGreen
                class="flex flex-1 mr-5"
                style="width: inherit;"
                >Сохранить</BaseButtonFilledGreen
              >
            </div>
            <div style="width: 400px;margin-left: 20px">
              <BaseButtonFilledDark
                class="flex flex-1"
                style="width: inherit;"
                >Отправить</BaseButtonFilledDark
              >
            </div>
            </div>
          </div>
  </template>
  
  <script setup>
  import { defineEmits, ref, onBeforeMount, onMounted } from 'vue';
  import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
  import BaseButtonFilledDark from '@/components/BaseButtonFilledDark.vue';

  import TabularSection from '@/components/Tabular/TabularSection.vue';
  import TabularFiltersWrapper from '@/components/Tabular/TabularFiltersWrapper.vue';
  import TabularFilterPeriod from '@/components/Tabular/TabularFilterPeriod.vue';
  import TabularFilterAllWorks from '@/components/Tabular/TabularFilterAllWorks.vue';
  import TabularFilterOr from '@/components/Tabular/TabularFilterOr.vue';
  import TabularFilterDate from '@/components/Tabular/TabularFilterDate.vue';
  import TabularButtonCross from '@/components/Tabular/TabularButtonCross.vue';
  import TabularButtonApplyFilters from '@/components/Tabular/TabularButtonApplyFilters.vue';
  import TabularTable from '@/components/Tabular/TabularTable.vue';
  import isEnv from '@/utils/isSpecEnv.js';
  
  onMounted(() => {
  if (isEnv('reviews')){
    console.log('reviews');
    const tableElement = document.querySelector('.tabletabletabletable');
    if (tableElement) {
      tableElement.style.width = '2000px';
    }

    const jjjjElement = document.querySelector('.jjjj');
    if (jjjjElement) {
      jjjjElement.style.overflowY = 'hidden';
    }
  }
});

  const emit = defineEmits(['filtersApplied', 'filtersReset', 'filterChange', 'workLoaded']);
  
  const props = defineProps({
    showFilterPeriod: {
    type: Boolean,
    default: true // Дефолтное значение для showFilterPeriod
  },
  showFilterAllWorks: {
    type: Boolean,
    default: true // Дефолтное значение для showFilterAllWorks
  },
  showButtonCross: {
    type: Boolean,
    default: true // Дефолтное значение для showButtonCross
  },
  showButtonApplyFilters: {
    type: Boolean,
    default: true // Дефолтное значение для showButtonApplyFilters
  },
  showButtons: {
    type: Boolean,
    default: true
  },
  showFilterOr: {
    type: Boolean,
    default: true // Дефолтное значение для showFilterOr
  },
    items: Array,
    currentView: String
  });
  
  const selectedDate = ref(1675623600);
  const selectedPeriod = ref('month');
  const selectedSort = ref('itemsByPosts');
  const selectedWorkId = ref('');
  
  const handleWorksLoaded = (ids) => {
    selectedWorkId.value = ids;
    emit('worksLoaded', {
      dateStart: selectedDate.value,
      period: selectedPeriod.value,
      workId: selectedWorkId.value
    });
  };
  
  onBeforeMount(async () => {
    await handleWorksLoaded();
    applyFilters();
  });
  
  const handleUpdateDate = (date) => {
    selectedDate.value = date;
  };
  
  const handleUpdatePeriod = (period) => {
    selectedPeriod.value = period;
  };
  
  const handleOptionSelected = (optionValue) => {
    selectedSort.value = optionValue;
    emit('optionSelected', {
        option: selectedSort.value,
    });
    
  };
  
  const handleWorkSelected = (workId) => {
    selectedWorkId.value = workId;
  };
  
  const applyFilters = () => {
    emit('filtersApplied', {
      date: selectedDate.value,
      period: selectedPeriod.value,
      sort: selectedSort.value,
      workId: selectedWorkId.value
    });
  };
  
  
  const defaultFilters = () => {
    emit('filtersReset');
    selectedDate.value = 1675623600;
    selectedPeriod.value = 'month';
    selectedSort.value = 'itemsByPosts';
    selectedWorkId.value = null;
    applyFilters();
  };
  </script>
  
  <style>
  .report-table-row:nth-child(odd) {
    background-color: #f5f5f5;
  }
  </style>
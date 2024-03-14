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
  
      <TabularTable style="display: block; padding: 30px;">
        <slot name="tabular-table-header"></slot>
        <slot name="tabular-table-table"></slot>
      </TabularTable>
    </div>
  </template>
  
  <script setup>
  import { defineEmits, ref, onBeforeMount } from 'vue';
  import TabularSection from '@/components/Tabular/TabularSection.vue';
  import TabularFiltersWrapper from '@/components/Tabular/TabularFiltersWrapper.vue';
  import TabularFilterPeriod from '@/components/Tabular/TabularFilterPeriod.vue';
  import TabularFilterAllWorks from '@/components/Tabular/TabularFilterAllWorks.vue';
  import TabularFilterOr from '@/components/Tabular/TabularFilterOr.vue';
  import TabularFilterDate from '@/components/Tabular/TabularFilterDate.vue';
  import TabularButtonCross from '@/components/Tabular/TabularButtonCross.vue';
  import TabularButtonApplyFilters from '@/components/Tabular/TabularButtonApplyFilters.vue';
  import TabularTable from '@/components/Tabular/TabularTable.vue';
  
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
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable vue/valid-v-on -->
<template>
  <div>
    <TabularSection>
      <slot name="tabular-title"></slot>
      <TabularFiltersWrapper>
        <TabularFilterPeriod v-if="isFilterPeriodVisible" @updatePeriod="onPeriodUpdate" />
        <TabularFilterOr v-if="isFilterOrVisible" @optionSelected="onOptionSelected" />
        <TabularFilterDate v-if="!isFilterDateVisible" @updateDate="onDateUpdate" />
        <TabularFilterAllWorks v-if="isFilterAllWorksVisible" @optionSelected="onWorkSelected" @worksLoaded="onWorksLoaded" />
        <TabularButtonCross v-if="isButtonCrossVisible" class="cursor-pointer" @click="resetSelectedFilters" />
        <TabularButtonApplyFilters v-if="isButtonApplyFiltersVisible" @click="applySelectedFilters" />
      </TabularFiltersWrapper>
    </TabularSection>
    <div class="w-full jjjj">
      <TabularTable class="tabletabletabletable" style="display: block; padding: 30px;">
        <slot name="tabular-table-header"></slot>
        <slot name="tabular-table-table"></slot>
      </TabularTable>
    </div>
  </div>
  <div v-if="areButtonsVisible" class="flex flex-col items-center">
    <div id="234" class="w-full flex mt-10 mb-3" style="justify-content: center">
      <div style="width: 400px;margin-right: 20px;">
        <BaseButtonFilledGreen @click="onSaveButtonClick" class="flex flex-1 mr-5" style="width: inherit;">
          Сохранить
        </BaseButtonFilledGreen>
      </div>
      <div style="width: 400px;margin-left: 20px">
        <BaseButtonFilledDark @click="onSendButtonClick" class="flex flex-1" style="width: inherit;">
          Отправить
        </BaseButtonFilledDark>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref, onBeforeMount, onMounted } from 'vue';
import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
import BaseButtonFilledDark from '@/components/BaseButtonFilledDark.vue';
import { useFilters } from '@/components/mixins/filtersMixin';
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
import { useStore } from '@/stores/main.js';
import { getUnixToday } from '@/utils/time/dateUtils.js'
const store = useStore();

const DEFAULT_DATE = getUnixToday();
const DEFAULT_PERIOD = store.mainPeriod;
const DEFAULT_SORT = store.mainSort;
const DEFAULT_WORK_ID = null;

onMounted(() => {
  if (isEnv('reviews')) {
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

const emit = defineEmits(['filtersApplied', 'filtersReset','optionSelected', 'updateFilters', 'worksLoaded','saveTable','sendTable']);

const props = defineProps({
  isFilterPeriodVisible: { type: Boolean, default: true },
  isFilterAllWorksVisible: { type: Boolean, default: true },
  isButtonCrossVisible: { type: Boolean, default: true },
  isButtonApplyFiltersVisible: { type: Boolean, default: true },
  areButtonsVisible: { type: Boolean, default: true },
  isFilterOrVisible: { type: Boolean, default: true },
  items: Array,
  currentView: String
});

const {
  emitFiltersUpdate, 
  resetFiltersToDefault,
  currentSelectedDate,
  currentSelectedPeriod,
  currentSelectedSort,
  currentSelectedWorkId
} = useFilters(emit);



const onWorksLoaded = (ids) => {
  currentSelectedWorkId.value = ids;
  emit('worksLoaded', {
    dateStart: currentSelectedDate.value,
    period: currentSelectedPeriod.value,
    workId: currentSelectedWorkId.value
  });
  emitFiltersUpdate();
};
const onSaveButtonClick = () => {emit('saveTable');};
const onSendButtonClick = () => {emit('sendTable');};
onBeforeMount(async () => {
  await onWorksLoaded();
  applySelectedFilters();
});

const onDateUpdate = (date) => {
  currentSelectedDate.value = date;
  emitFiltersUpdate();
};

const onPeriodUpdate = (period) => {
  currentSelectedPeriod.value = period;
  emitFiltersUpdate();
};

const onOptionSelected = (optionValue) => {
  currentSelectedSort.value = optionValue;
  emit('optionSelected', {
    option: currentSelectedSort.value,
  });
  emitFiltersUpdate();
};

const onWorkSelected = (workId) => {
  currentSelectedWorkId.value = workId;
  emitFiltersUpdate();
};

const applySelectedFilters = () => {
  emit('filtersApplied', {
    date: currentSelectedDate.value,
    period: currentSelectedPeriod.value,
    sort: currentSelectedSort.value,
    workId: currentSelectedWorkId.value
  });
  emitFiltersUpdate();
};

const resetSelectedFilters = () => {
  emit('filtersReset', {
    date: DEFAULT_DATE,
    period: DEFAULT_PERIOD,
    sort: DEFAULT_SORT,
    workId: DEFAULT_WORK_ID
  });
  emitFiltersUpdate();
};

</script>

  <style>
  .report-table-row:nth-child(odd) {
    background-color: #f5f5f5;
  }
  </style>

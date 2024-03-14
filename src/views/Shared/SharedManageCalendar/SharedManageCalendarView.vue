<template>
  <div>
    
    <MainHeader />
    <MainHeaderGap />

    <TabularSection>
      <TabularPrimeTitle class="mb-2">Календарь рабочих смен</TabularPrimeTitle>
      <TabularFilterDate @updateDate="handleSelectedDateFirst" style="flex: 307;"/>
    </TabularSection>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';

import TabularSection from '@/components/Tabular/TabularSection.vue';
import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
import TabularFilterDate from '@/components/Tabular/TabularFilterDate.vue';

import '@vuepic/vue-datepicker/dist/main.css';







</script>
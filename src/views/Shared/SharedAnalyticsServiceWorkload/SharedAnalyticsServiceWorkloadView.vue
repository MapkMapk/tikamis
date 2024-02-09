<template>
  <MainHeader />
  <MainHeaderGap />
  <TabularSection>
    <TabularPrimeTitle class="mb-2">22 сентября 2023, 11:25</TabularPrimeTitle>
    <TabularPrimeDescription class="mb-5"
      >Свободно для записи 7 постов 10 ч 50 мин</TabularPrimeDescription
    >
    <TabularFiltersWrapper>
      <SharedAnalyticsServiceWorkloadFilterFreeWindows />
      <TabularFilterPeriod />
      <TabularFilterDate />
      <TabularFilterPosts />
    </TabularFiltersWrapper>
    <div class="flex flex-col w-full mt-7">
      <div class="flex w-full">
        <div class="flex flex-1 text-lg font-medium items-center h-[42px] pl-[10px] border border-gray-d9d9d9">Пост</div>
        <div class="flex flex-1 h-[42px] border border-gray-d9d9d9">8:00</div>
        <div class="flex flex-1 h-[42px] border border-gray-d9d9d9">9:00</div>
        <div class="flex flex-1 h-[42px] border border-gray-d9d9d9">10:00</div>
        <div class="flex flex-1 h-[42px] border border-gray-d9d9d9">11:00</div>
        <div class="flex flex-1 h-[42px] border border-gray-d9d9d9">12:00</div>
        <div class="flex flex-1 h-[42px] border border-gray-d9d9d9">13:00</div>
        <div class="flex flex-1 h-[42px] border border-gray-d9d9d9">14:00</div>
        <div class="flex flex-1 h-[42px] border border-gray-d9d9d9">15:00</div>
        <div class="flex flex-1 h-[42px] border border-gray-d9d9d9">18:00</div>
        <div class="flex flex-1 h-[42px] border border-gray-d9d9d9">19:00</div>
        <div class="flex flex-1 h-[42px] border border-gray-d9d9d9">20:00</div>
      </div>
      <div class="flex">
        <div class="flex-col flex-1 items-center w-[92px] h-[50px] pl-[10px]">
          <div class="font-semibold">№1</div>
          <div class="text-gray-a1a4ad text-sm">4ч 30 м</div>
        </div>
      </div>
    </div>
  </TabularSection>
</template>
<script setup>
import TabularSection from '@/components/Tabular/TabularSection.vue';
import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
import TabularPrimeDescription from '@/components/Tabular/TabularPrimeDescription.vue';
import TabularFiltersWrapper from '@/components/Tabular/TabularFiltersWrapper.vue';
import TabularFilterPeriod from '@/components/Tabular/TabularFilterPeriod.vue';
import TabularFilterDate from '@/components/Tabular/TabularFilterDate.vue';
import TabularFilterPosts from '@/components/Tabular/TabularFilterPosts.vue';
import SharedAnalyticsServiceWorkloadFilterFreeWindows from '@/views/Shared/SharedAnalyticsServiceWorkload/SharedAnalyticsServiceWorkloadFilterFreeWindows.vue';
import MainHeader from '@/components/MainHeader.vue';
import MainHeaderGap from '@/components/MainHeaderGap.vue';
</script>
<style scoped></style>

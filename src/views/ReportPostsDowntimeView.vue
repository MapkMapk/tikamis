<template>
  <TheDirectorHeader />
  <HeaderGap />
  <section class="report-section">
    <ReportPrimeTitle>Записи клиентов 22 июня 2023</ReportPrimeTitle>
    <div class="flex">
      <ReportInputPeriod class="flex-1" />
      <ReportInputDate class="border-l-0 flex-[2]" />
      <ReportInputShow class="flex-[1]" />
      <ReportButtonCross />
      <ReportButtonApplyFilters class="flex-[0.5]" />
    </div>
    <div class="flex flex-col w-full mt-[20px]">
      <div class="flex">
        <div class="flex items-center bg-gray-2c2d2f h-[50px]">
          wef
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import TheDirectorHeader from '@/components/TheDirectorHeader.vue';
import ReportPrimeTitle from '@/components/ReportPrimeTitle.vue';
import HeaderGap from '@/components/HeaderGap.vue';
import ReportInputDate from '@/components/ReportInputDate.vue';
import ReportInputPeriod from '@/components/ReportInputPeriod.vue';
import ReportInputShow from '@/components/ReportInputShow.vue';
import ReportButtonCross from '@/components/ReportButtonCross.vue';
import ReportButtonApplyFilters from '@/components/ReportButtonApplyFilters.vue';
</script>

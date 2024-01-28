<template>
  <Header />
  <HeaderGap />
  <ReportSection>
    <ReportPrimeTitle>Заказанные, но не выполненные работы</ReportPrimeTitle>
    <ReportFiltersWrapper>
      <ReportFilterPeriod />
      <ReportFilterDate />
      <ReportFilterEntity />
      <ReportFilterJobs />
      <ReportButtonCross />
      <ReportButtonApplyFilters />
    </ReportFiltersWrapper>
    <ReportTable class="mt-5">
      <ReportTableColumn
        class="w-1/2"
        id="#columnMechanics"
      >
        <ReportTableCellTop>Механик</ReportTableCellTop>
        <ReportTableCell>Соколов Виктор Фёдорович</ReportTableCell>
        <ReportTableCell>Бабизян Рисов Карп</ReportTableCell>
        <ReportTableCell>Неорденко Николаев Крисп</ReportTableCell>
        <ReportTableCell>Рычагов Невернти</ReportTableCell>
        <ReportTableCell>Анатолий Басурман Крехтехович</ReportTableCell>
        <ReportTableCell>Серпиголовый Каруман</ReportTableCell>
        <ReportTableCellBottom>Итого простоя:</ReportTableCellBottom>
      </ReportTableColumn>
      <ReportTableColumn
        class="w-1/4"
        id="columnJobs"
      >
        <ReportTableCellTop>Работы</ReportTableCellTop>
        <ReportTableCell>10</ReportTableCell>
        <ReportTableCell>71</ReportTableCell>
        <ReportTableCell>1</ReportTableCell>
        <ReportTableCell>4</ReportTableCell>
        <ReportTableCell>32</ReportTableCell>
        <ReportTableCell>16</ReportTableCell>
        <ReportTableCellBottom></ReportTableCellBottom>
      </ReportTableColumn>
      <ReportTableColumn
        class="w-1/4"
        id="columnLost"
      >
        <ReportTableCellTop>Потери</ReportTableCellTop>
        <ReportTableCell>14 600 ₽</ReportTableCell>
        <ReportTableCell>14 600 ₽</ReportTableCell>
        <ReportTableCell>14 600 ₽</ReportTableCell>
        <ReportTableCell>14 600 ₽</ReportTableCell>
        <ReportTableCell>14 600 ₽</ReportTableCell>
        <ReportTableCell>14 600 ₽</ReportTableCell>
        <ReportTableCellBottom>46 400₽</ReportTableCellBottom>
      </ReportTableColumn>
    </ReportTable>
    <ReportButtonsWrapper>
      <ReportButtonSave class="mr-[15px]" />
      <ReportButtonSend class="ml-[15px]" />
    </ReportButtonsWrapper>
  </ReportSection>
</template>
<script setup>
import HeaderGap from '@/components/HeaderGap.vue';
import Header from '@/components/Header.vue';
import ReportPrimeTitle from '@/components/ReportPrimeTitle.vue';
import ReportFilterPeriod from '@/components/ReportFilterPeriod.vue'
import ReportFilterDate from '@/components/ReportFilterDate.vue'
import ReportTableColumn from '@/components/ReportTableColumn.vue'
import ReportFiltersWrapper from '@/components/ReportFiltersWrapper.vue'
import ReportFilterEntity from '@/components/ReportFilterEntity.vue'
import ReportTable from '@/components/ReportTable.vue'
import ReportTableCellBottom from '@/components/ReportTableCellBottom.vue'
import ReportButtonCross from '@/components/ReportButtonCross.vue'
import ReportButtonsWrapper from '@/components/ReportButtonsWrapper.vue'
import ReportButtonApplyFilters from '@/components/ReportButtonApplyFilters.vue'
import ReportTableCell from '@/components/ReportTableCell.vue'
import ReportTableCellTop from '@/components/ReportTableCellTop.vue'
import ReportButtonSave from '@/components/ReportButtonSave.vue'
import ReportButtonSend from '@/components/ReportButtonSend.vue'
import ReportSection from '@/components/ReportSection.vue'
import ReportFilterJobs from '@/components/ReportFilterJobs.vue'
</script>

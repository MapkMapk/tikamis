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
import ReportPrimeTitle from '@/views/Shared/_Tabular/TabularPrimeTitle.vue';
import ReportFilterPeriod from '@/views/Shared/_Tabular/TabularFilterPeriod.vue'
import ReportFilterDate from '@/views/Shared/_Tabular/TabularFilterDate.vue'
import ReportTableColumn from '@/views/Shared/_Tabular/TabularTableColumn.vue'
import ReportFiltersWrapper from '@/views/Shared/_Tabular/TabularFiltersWrapper.vue'
import ReportFilterEntity from '@/views/Shared/_Tabular/TabularFilterEntity.vue'
import ReportTable from '@/views/Shared/_Tabular/TabularTable.vue'
import ReportTableCellBottom from '@/views/Shared/_Tabular/TabularTableCellBottom.vue'
import ReportButtonCross from '@/views/Shared/_Tabular/TabularButtonCross.vue'
import ReportButtonsWrapper from '@/views/Shared/_Tabular/TabularButtonsWrapper.vue'
import ReportButtonApplyFilters from '@/views/Shared/_Tabular/TabularButtonApplyFilters.vue'
import ReportTableCell from '@/views/Shared/_Tabular/TabularTableCell.vue'
import ReportTableCellTop from '@/views/Shared/_Tabular/TabularTableCellTop.vue'
import ReportButtonSave from '@/views/Shared/_Tabular/TabularButtonSave.vue'
import ReportButtonSend from '@/views/Shared/_Tabular/TabularButtonSend.vue'
import ReportSection from '@/views/Shared/_Tabular/TabularSection.vue'
import ReportFilterJobs from '@/views/Shared/_Tabular/TabularFilterJobs.vue'
</script>

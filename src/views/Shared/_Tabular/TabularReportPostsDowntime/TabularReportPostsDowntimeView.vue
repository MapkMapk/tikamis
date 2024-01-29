<template>
  <Header />
  <HeaderGap />
  <ReportSection>
    <ReportPrimeTitle>Простои постов</ReportPrimeTitle>
    <ReportFiltersWrapper>
      <ReportFilterPeriod />
      <ReportFilterDate />
      <ReportFilterEntity />
      <ReportButtonCross />
      <ReportButtonApplyFilters class="flex-[0.5]" />
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
        id="#columnDowntime"
      >
        <ReportTableCellTop>Время простоя, мин</ReportTableCellTop>
        <ReportTableCell>10</ReportTableCell>
        <ReportTableCell>71</ReportTableCell>
        <ReportTableCell>1</ReportTableCell>
        <ReportTableCell>4</ReportTableCell>
        <ReportTableCell>32</ReportTableCell>
        <ReportTableCell>16</ReportTableCell>
        <ReportTableCellBottom>135 минут</ReportTableCellBottom>
      </ReportTableColumn>
      <ReportTableColumn
        class="w-1/4"
        id="columnDate"
      >
        <ReportTableCellTop>Дата</ReportTableCellTop>
        <ReportTableCell>22.06.2022 09:35</ReportTableCell>
        <ReportTableCell>22.06.2022 09:35</ReportTableCell>
        <ReportTableCell>22.06.2022 09:35</ReportTableCell>
        <ReportTableCell>22.06.2022 09:35</ReportTableCell>
        <ReportTableCell>22.06.2022 09:35</ReportTableCell>
        <ReportTableCell>22.06.2022 09:35</ReportTableCell>
        <ReportTableCellBottom />
      </ReportTableColumn>
    </ReportTable>
    <ReportButtonsWrapper>
      <ReportButtonSave class="mr-[15px]" />
      <ReportButtonSend class="ml-[15px]" />
    </ReportButtonsWrapper>
  </ReportSection>
</template>

<script setup>
import Header from '@/components/Header.vue';
import ReportPrimeTitle from '@/views/Shared/_Tabular/TabularPrimeTitle.vue';
import HeaderGap from '@/components/HeaderGap.vue';
import ReportFilterDate from '@/views/Shared/_Tabular/TabularFilterDate.vue';
import ReportFilterPeriod from '@/views/Shared/_Tabular/TabularFilterPeriod.vue';
import ReportFilterEntity from '@/views/Shared/_Tabular/TabularFilterEntity.vue';
import ReportButtonCross from '@/views/Shared/_Tabular/TabularButtonCross.vue';
import ReportButtonApplyFilters from '@/views/Shared/_Tabular/TabularButtonApplyFilters.vue';
import ReportButtonSend from '@/views/Shared/_Tabular/TabularButtonSend.vue';
import ReportButtonSave from '@/views/Shared/_Tabular/TabularButtonSave.vue';
import ReportTableColumn from '@/views/Shared/_Tabular/TabularTableColumn.vue';
import ReportTableCellTop from '@/views/Shared/_Tabular/TabularTableCellTop.vue';
import ReportTableCell from '@/views/Shared/_Tabular/TabularTableCell.vue';
import ReportTableCellBottom from '@/views/Shared/_Tabular/TabularTableCellBottom.vue';
import ReportTable from '@/views/Shared/_Tabular/TabularTable.vue';
import ReportFiltersWrapper from '@/views/Shared/_Tabular/TabularFiltersWrapper.vue';
import ReportSection from '@/views/Shared/_Tabular/TabularSection.vue';
import ReportButtonsWrapper from '@/views/Shared/_Tabular/TabularButtonsWrapper.vue';
</script>

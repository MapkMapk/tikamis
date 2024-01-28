<template>
  <Header />
  <HeaderGap />
  <ReportSection>
    <ReportPrimeTitle>Дополнительные работы</ReportPrimeTitle>
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
        <ReportTableCellBottom>Итого потерь:</ReportTableCellBottom>
      </ReportTableColumn>
      <ReportTableColumn
        class="w-1/4"
        id="#columnDowntime"
      >
        <ReportTableCellTop>Работы</ReportTableCellTop>
        <ReportTableCell>Все работы</ReportTableCell>
        <ReportTableCell>Все работы</ReportTableCell>
        <ReportTableCell>Все работы</ReportTableCell>
        <ReportTableCell>Все работы</ReportTableCell>
        <ReportTableCell>Все работы</ReportTableCell>
        <ReportTableCell>Все работы</ReportTableCell>
        <ReportTableCellBottom />
      </ReportTableColumn>
      <ReportTableColumn
        class="w-1/4"
        id="columnDate"
      >
        <ReportTableCellTop>Потери</ReportTableCellTop>
        <ReportTableCell>14500 Р</ReportTableCell>
        <ReportTableCell>14500 Р</ReportTableCell>
        <ReportTableCell>14500 Р</ReportTableCell>
        <ReportTableCell>14500 Р</ReportTableCell>
        <ReportTableCell>14500 Р</ReportTableCell>
        <ReportTableCell>14500 Р</ReportTableCell>
        <ReportTableCellBottom>46 400 Р</ReportTableCellBottom>
      </ReportTableColumn>
    </ReportTable>
<!--    <ReportButtonsWrapper>-->
<!--      <ReportButtonSave class="mr-[15px]" />-->
<!--      <ReportButtonSend class="ml-[15px]" />-->
<!--    </ReportButtonsWrapper>-->
  </ReportSection>
</template>

<script setup>
import Header from '@/components/Header.vue';
import ReportPrimeTitle from '@/components/ReportPrimeTitle.vue';
import HeaderGap from '@/components/HeaderGap.vue';
import ReportFilterDate from '@/components/ReportFilterDate.vue';
import ReportFilterPeriod from '@/components/ReportFilterPeriod.vue';
import ReportFilterEntity from '@/components/ReportFilterEntity.vue';
import ReportButtonCross from '@/components/ReportButtonCross.vue';
import ReportButtonApplyFilters from '@/components/ReportButtonApplyFilters.vue';
import ReportButtonSend from '@/components/ReportButtonSend.vue';
import ReportButtonSave from '@/components/ReportButtonSave.vue';
import ReportTableColumn from '@/components/ReportTableColumn.vue';
import ReportTableCellTop from '@/components/ReportTableCellTop.vue';
import ReportTableCell from '@/components/ReportTableCell.vue';
import ReportTableCellBottom from '@/components/ReportTableCellBottom.vue';
import ReportTable from '@/components/ReportTable.vue';
import ReportFiltersWrapper from '@/components/ReportFiltersWrapper.vue';
import ReportSection from '@/components/ReportSection.vue';
import ReportButtonsWrapper from '@/components/ReportButtonsWrapper.vue';
</script>

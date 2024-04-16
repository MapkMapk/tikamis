<template>
    <MainHeader />
    <MainHeaderGap />
    <TabularSection>
      <TabularPrimeTitle>Управление автосервисами</TabularPrimeTitle>
      <TabularTable>
        <TabularTableColumn class="flex-1">
          <TabularTableCellTop>Работа</TabularTableCellTop>
          <TabularTableCell v-for="work in works" :key="work.id">{{work.name}}</TabularTableCell>
        </TabularTableColumn>
        <TabularTableColumn class="flex-[2]">
          <TabularTableCellTop>Режим записи</TabularTableCellTop>
          <TabularTableCell v-for="work in works" :key="work.id" :class="{'text-gray-400': work.saleText == null}">{{getQueuingModeText(work.saleText)}}</TabularTableCell>
        </TabularTableColumn>
        <TabularTableColumn class="">
          <TabularTableCellTop></TabularTableCellTop>
          <TabularTableCell v-for="work in works" :key="work.id">
            <BaseSvgIcon @click="routeToTextEdit(work.id)" name="pencil-gray" class="w-6 h-6 cursor-pointer"/>
          </TabularTableCell>
        </TabularTableColumn>
      </TabularTable>
    </TabularSection>
  </template>
  <script setup>
  import TabularSection from '@/components/Tabular/TabularSection.vue';
  import TabularPrimeTitle from '@/components/Tabular/TabularPrimeTitle.vue';
  import TabularTable from '@/components/Tabular/TabularTable.vue';
  import TabularTableCellTop from '@/components/Tabular/TabularTableCellTop.vue';
  import TabularTableCell from '@/components/Tabular/TabularTableCell.vue';
  import TabularTableColumn from '@/components/Tabular/TabularTableColumn.vue';
  import MainHeader from '@/components/MainHeader.vue';
  import MainHeaderGap from '@/components/MainHeaderGap.vue';
  import { onBeforeMount, ref } from 'vue'
  import router from '@/router/index.js'
  import BaseSvgIcon from '@/components/BaseSvgIcon.vue'
  import { sadminApiClient } from '@/api/sadminApiClient';
  
  let works = ref({});
  
  onBeforeMount(async () => {
    //const data = await sadminApiManageworks(); .get('/all-works')
    const data = await sadminApiClient.get('/all-works');
    works.value = data.data.works;
    console.log(data.data.works);
  })

  function truncateText(text) {
    if (text.length > 120) {
        return text.substring(0, 120 - 4) + ' ...';
    } else {
        return text;
    }
  }
  function getQueuingModeText(saleText) {
    if (saleText == null) {return 'Акции не предусмотрены'}

    return truncateText(saleText)
  }
  
  function routeToTextEdit(workId) {
    router.push({path: '/sadmin/manage/text-edit', query: {id: workId}})
  }
  </script>
  <style>
  .text-gray-400{
    color: #A1A4AD
  }
  </style>
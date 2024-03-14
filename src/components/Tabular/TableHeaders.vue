<template>
    <div :style="gridStyle">
      <TabularTableCellTop
        v-for="column in columns"
        :key="column.header"
        :style="{ paddingLeft: '10px' }"
      >
        {{ column.header }}
      </TabularTableCellTop>
    </div>
  </template>
  
  <script setup>
  import TabularTableCellTop from '@/components/Tabular/TabularTableCellTop.vue';
  </script>
  
  <script>
  export default {
    props: {
      columns: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      gridStyle() {
        // Используем размеры из свойства size для определения grid-template-columns
        const templateColumns = this.columns.map(column => column.size).join(' ');
  
        return {
          display: 'grid',
          gridTemplateColumns: templateColumns,
        };
      }
    }
  }
  </script>
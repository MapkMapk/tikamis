<template>
    <div class="report-table-row" style="display: grid;">
      <slot />
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    rowWidth: {
      type: String,
      default: 'auto'
    }
  });
  </script>
  
  <style scoped>
  .report-table-row {
    display: grid;
    grid-template-rows: auto; /* Необходимо задать высоту ячеек */
  }
  </style>
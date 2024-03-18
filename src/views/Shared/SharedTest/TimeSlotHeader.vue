<template>
    <div class="time-slot-header">
      {{ time }}
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  export default defineComponent({
    name: 'TimeSlotHeader',
    props: {
      time: {
        type: String as PropType<string>,
        required: true,
      },
    },
  });
  </script>
  
  <style>
  .time-slot-header {
    /* Стили для отображения заголовка временного интервала */
    font-weight: bold;
    text-align: center;
    /* Настройте стили, чтобы они соответствовали вашему дизайну */
  }
  </style>
  
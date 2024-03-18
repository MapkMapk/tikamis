<template>
    <div class="time-slot">
      <div v-if="events.length > 0" class="events-container">
        <Event
          v-for="event in events"
          :key="event.id"
          :title="event.title"
          :description="event.description"
          :duration="event.duration"
        />
      </div>
      <div v-else class="no-events">
        Нет событий
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import Event from './Event.vue';
  
  export default defineComponent({
    name: 'TimeSlot',
    components: {
      Event
    },
    props: {
      time: {
        type: String as PropType<string>,
        required: true,
      },
      events: {
        type: Array as PropType<Array<{ id: number; title: string; description: string; duration: number }>>,
        default: () => []
      },
    },
  });
  </script>
  
  <style>
  .time-slot {
    /* Стили для временного интервала */
  }
  .events-container {
    /* Стили для контейнера с событиями */
  }
  .no-events {
    /* Стили, когда событий нет */
    color: #aaa;
    text-align: center;
  }
  </style>
  
<template>
  <div
    v-if="mainStore.isHeaderMenuOpen"
    class="absolute top-[60px] flex flex-col min-w-[276px] overflow-y-auto h-[calc(100vh-60px)] bg-gray-2c2d2f mr-[30px]"
  >
    <div class="w-full flex flex-col pt-[10px]">
      <TheHeaderMenuPartition
        v-for="(nav, index) in navigation"
        :index="index"
        :key="nav.partition"
        :is-open="nav.isOpen"
        :partition="nav.partition"
        :routes="nav.routes"
        @toggle="toggle"
      />
    </div>
    <div
      class="mt-auto flex flex-col py-[20px] border-t-gray-53565b border-t text-2xl text-white justify-center pl-[30px] pr-[20px] cursor-pointer"
    >
      Выход
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import TheHeaderMenuPartition from '@/components/TheHeaderMenuPartition.vue';
import { useMainStore } from '@/stores/shared/main.js'

const mainStore = useMainStore();

const navigation = ref([
  {
    isOpen: false,
    partition: 'Управление',
    routes: [
      { name: 'Технические настройки', url: '/director/technical-settings' },
      { name: 'Записи клиентов', url: '/' },
      { name: 'Календарь рабочих смен', url: '/' }
    ]
  },
  {
    isOpen: false,
    partition: 'Аналитика',
    routes: [
      { name: 'Загруженность сервиса', url: '/' },
      { name: 'Видеоархив', url: '/' },
      { name: 'КПД постов', url: '/' },
      { name: 'КПД сервиса', url: '/' },
      { name: 'Сервисная история', url: '/' },
      { name: 'Отзывы', url: '/' }
    ]
  },
  {
    isOpen: false,
    partition: 'Отчеты',
    routes: [
      { name: 'Простои постов', url: '/' },
      { name: 'Не приехавшие клиенты', url: '/' },
      { name: 'Заказанные, но не выполненные работы', url: '/' },
      { name: 'Дополнительные работы', url: '/' },
      { name: 'Фальшивые гос. номера', url: '/' },
      { name: 'Подозрительная привязка телефона', url: '/' }
    ]
  }
]);

function toggle(index) {
  navigation.value.forEach((nav) => {
    nav.isOpen = false;
  });
  navigation.value[index].isOpen = !navigation.value[index].isOpen;
}
</script>

<template>
  <header class="fixed z-10 bg-white flex w-full h-the-header">
    <div class="flex w-full">
      <div
        @click="mainStore.isHeaderMenuOpen = !mainStore.isHeaderMenuOpen"
        :class="{
          'bg-gray-2c2d2f': mainStore.isHeaderMenuOpen,
          'border-b-0': mainStore.isHeaderMenuOpen
        }"
        class="relative flex bg- h-full pl-[30px] pr-[30px] justify-center items-center border-r border-b border-gray-dcdcdc cursor-pointer"
      >
        <BaseSvgIcon
          v-if="!mainStore.isHeaderMenuOpen"
          name="burger-menu"
          class="w-[30px] h-[30px]"
        />
        <BaseSvgIcon
          v-if="mainStore.isHeaderMenuOpen"
          name="cross"
          class="w-[30px] h-[30px]"
        />
      </div>
      <div class="flex justify-between items-center w-full border-b border-gray-dcdcdc">
        <div class="flex items-center ml-7">
          <BaseSvgIcon
            name="logo"
            class="w-[32px] h-[32px]"
          />
          <span class="pl-[10px] font-semibold text-lg">Директор</span>
          <span class="pl-[30px] text-lg"></span>
        </div>
        <div class="pr-[30px]">Когалым, Проспект Нефтяников, 1а/4</div>
      </div>
    </div>
    <div
      v-if="mainStore.isHeaderMenuOpen"
      class="absolute top-[60px] flex flex-col min-w-[276px] max-w-[276px] overflow-y-auto h-[calc(100vh-60px)] bg-gray-2c2d2f mr-[30px]"
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
  </header>
</template>

<script setup>
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
import { useMainStore } from '@/stores/shared/main.js';
import TheHeaderMenuPartition from '@/components/TheHeaderMenuPartition.vue';
import { ref } from 'vue';

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

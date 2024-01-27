<template>
  <div
    v-if="mainStore.isHeaderMenuOpen"
    class="absolute top-[60px] flex flex-col min-w-[276px] max-w-[276px] overflow-y-auto h-[calc(100vh-60px)] bg-gray-2c2d2f mr-[30px]"
  >
    <div class="w-full flex flex-col pt-[10px]">
      <TheHeaderMenuPartition
        v-for="(nav, index) in navigation"
        :index="Number(index)"
        :key="nav.partition"
        :is-open="nav.isOpen"
        :partition="nav.partition"
        :routes="nav.routes"
        @isOpenSwitch="isOpenSwitch"
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
import TheHeaderMenuPartition from '@/components/HeaderMenuPartition.vue';
import { useMainStore } from '@/stores/shared/main.js'
import { ref } from 'vue'
import { getViewEnv } from '@/utils/getViewEnv.js'

const mainStore = useMainStore();

function isOpenSwitch(index) {
  navigation.value.forEach((nav) => {
    nav.isOpen = false
  })
  navigation.value[index].isOpen = !navigation.value[index].isOpen
}

let navigation = ref([])

if (getViewEnv() === 'director') {
  navigation.value = [
    {
      isOpen: false,
      partition: 'Управление',
      routes: [
        { name: 'Технические настройки', url: '/director/manage/settings' },
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
        { name: 'Фальшивые гос.номера', url: '/' },
        { name: 'Подозрительная привязка телефонов', url: '/' }
      ]
    }
  ]
}

if (getViewEnv() === 'sadmin') {
  navigation.value = [
    {
      isOpen: false,
      partition: 'Управление',
      routes: [
        { name: 'Аккаунты директоров', url: '/' },
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
        { name: 'Фальшивые гос.номера', url: '/' },
        { name: 'Подозрительная привязка телефонов', url: '/' }
      ]
    }
  ]
}
</script>

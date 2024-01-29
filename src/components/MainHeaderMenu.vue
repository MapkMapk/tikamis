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
      @click="logout"
      class="mt-auto flex flex-col py-[20px] border-t-gray-53565b border-t text-2xl text-white justify-center pl-[30px] pr-[20px] cursor-pointer"
    >
      Выход
    </div>
  </div>
</template>
<script setup>
import TheHeaderMenuPartition from '@/components/MainHeaderMenuPartition.vue';
import { useMainStore } from '@/stores/shared/main.js'
import { ref } from 'vue'
import { isEnv } from '@/utils/isEnv.js'
import directorApiLogout from '@/api/director/directorApiLogout.js'
import sadminApiLogout from '@/api/sadmin/sadminApiLogout.js'

const mainStore = useMainStore();

function logout() {
  if (isEnv('director')) {
    directorApiLogout()
    return;
  }
  if (isEnv('sadmin')) {
    sadminApiLogout()
  }
}

function isOpenSwitch(index) {
  navigation.value.forEach((nav) => {
    nav.isOpen = false
  })
  navigation.value[index].isOpen = !navigation.value[index].isOpen
}

let navigation = ref([])

if (isEnv('sadmin')) {
  navigation.value = [
    {
      isOpen: false,
      partition: 'Управление',
      routes: [
        { name: 'Аккаунты директоров', url: '/sadmin' },
        { name: 'Записи клиентов', url: '/sadmin/manage/customer-records' },
        { name: 'Календарь рабочих смен', url: '/sadmin/manage/calendar' }
      ]
    },
    {
      isOpen: false,
      partition: 'Аналитика',
      routes: [
        { name: 'Загруженность сервиса', url: '/sadmin/service-workload' },
        { name: 'Видеоархив', url: '/sadmin' },
        { name: 'КПД постов', url: '/sadmin/posts-kpd' },
        { name: 'КПД сервиса', url: '/sadmin/service-kpd' },
        { name: 'Сервисная история', url: '/sadmin/service-history' },
        { name: 'Отзывы', url: '/sadmin/reviews' }
      ]
    },
    {
      isOpen: false,
      partition: 'Отчеты',
      routes: [
        { name: 'Простои постов', url: '/sadmin/posts-downtime' },
        { name: 'Не приехавшие клиенты', url: '/sadmin/customer-skips' },
        { name: 'Заказанные, но не выполненные работы', url: '/sadmin/canceled-works' },
        { name: 'Дополнительные работы', url: '/sadmin/added-works' },
        { name: 'Фальшивые гос.номера', url: '/sadmin/plate-fakes' },
        { name: 'Подозрительная привязка телефонов', url: '/sadmin/suspicious-phones' }
      ]
    }
  ]
}

if (isEnv('director')) {
  navigation.value = [
    {
      isOpen: false,
      partition: 'Управление',
      routes: [
        { name: 'Технические настройки', url: '/director/manage/settings' },
        { name: 'Записи клиентов', url: '/director/manage/customer-records' },
        { name: 'Календарь рабочих смен', url: '/director/manage/calendar' }
      ]
    },
    {
      isOpen: false,
      partition: 'Аналитика',
      routes: [
        { name: 'Загруженность сервиса', url: '/director/service-workload' },
        { name: 'Видеоархив', url: '/director' },
        { name: 'КПД постов', url: '/director/posts-kpd' },
        { name: 'КПД сервиса', url: '/director/service-kpd' },
        { name: 'Сервисная история', url: '/director/service-history' },
        { name: 'Отзывы', url: '/director/reviews' }
      ]
    },
    {
      isOpen: false,
      partition: 'Отчеты',
      routes: [
        { name: 'Простои постов', url: '/director/posts-downtime' },
        { name: 'Не приехавшие клиенты', url: '/director/customer-skips' },
        { name: 'Заказанные, но не выполненные работы', url: '/director/canceled-works' },
        { name: 'Дополнительные работы', url: '/director/added-works' },
        { name: 'Фальшивые гос.номера', url: '/director/plate-fakes' },
        { name: 'Подозрительная привязка телефонов', url: '/director/suspicious-phones' }
      ]
    }
  ]
}


</script>

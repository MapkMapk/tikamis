<template>
  <header class="flex w-full h-the-header">
    <div
      @click="directorBaseStore.isMenuActive = !directorBaseStore.isMenuActive"
      :class="{ 'bg-gray-2c2d2f': directorBaseStore.isMenuActive, 'border-b-0': directorBaseStore.isMenuActive }"
      class="relative flex bg- h-full pl-[30px] pr-[30px] justify-center items-center border-r border-b border-gray-dcdcdc cursor-pointer"
    >
      <BaseSvgIcon
        v-if="!directorBaseStore.isMenuActive"
        name="burger-menu"
        class="w-[30px] h-[30px]"
      />
      <BaseSvgIcon
        v-if="directorBaseStore.isMenuActive"
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
  </header>
</template>

<script setup>
import { useDirectorBaseStore } from '@/stores/director/directorBase.js'
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
const directorBaseStore = useDirectorBaseStore()
</script>

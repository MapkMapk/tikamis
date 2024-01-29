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
          :name="!mainStore.isHeaderMenuOpen ? 'burger-menu' : 'cross'"
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
    <MainHeaderMenu />
  </header>
</template>

<script setup>
import BaseSvgIcon from '@/components/BaseSvgIcon.vue'
import { useMainStore } from '@/stores/shared/main.js'
import MainHeaderMenu from '@/components/MainHeaderMenu.vue'

const mainStore = useMainStore();
</script>

<template>
  <header class="flex w-full border-b border-gray-dcdcdc h-the-header">
    <div class="flex h-full pl-[30px] pr-[30px] justify-center items-center border-r border-gray-dcdcdc">
      <SvgIcon name="burger-menu" class="w-[30px] h-[30px]"/>
    </div>
    <div class="flex justify-between items-center w-full">
      <div class="flex items-center ml-7">
        <SvgIcon name="logo" class="w-[32px] h-[32px]"/>
        <span class="pl-[10px] font-semibold text-lg">Механик</span>
      </div>
      <div class="pr-[30px]">
        Когалым, Проспект Нефтяников, 1а/4
      </div>
    </div>
  </header>
</template>

<script setup>
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
</script>
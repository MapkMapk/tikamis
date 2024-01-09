<template>
  <header class="flex w-full border-b border-gray-dcdcdc h-the-header">
    <div @click="isMenuActive=!isMenuActive" :class="{'bg-gray-2c2d2f':isMenuActive}" class="relative flex bg- h-full pl-[30px] pr-[30px] justify-center items-center border-r border-gray-dcdcdc cursor-pointer">
      <SvgIcon v-if="!isMenuActive" name="burger-menu" class="w-[30px] h-[30px]"/>
      <SvgIcon v-if="isMenuActive" name="cross" class="w-[30px] h-[30px]"/>
      <div v-if="isMenuActive" class="absolute pl-[30px] text-white w-[276px] flex items-center bg-gray-2c2d2f -bottom-[80px] left-0 h-[80px]">wefwef</div>
    </div>
    <div class="flex justify-between items-center w-full">
      <div class="flex items-center ml-7">
        <SvgIcon name="logo" class="w-[32px] h-[32px]"/>
        <span class="pl-[10px] font-semibold text-lg">Механик</span>
        <span class="pl-[30px] text-lg">Шевелев Владимир Дмитриевич</span>
      </div>
      <div class="pr-[30px]">
        Когалым, Проспект Нефтяников, 1а/4
      </div>
    </div>
  </header>
</template>

<script setup>
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { ref } from 'vue';

let isMenuActive = ref(false);
</script>
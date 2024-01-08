<template>
  <TheHeader />
  <section :class="{'!h-auto':isMechanicsVisible}"
           class="flex flex-col w-full h-[calc(100vh-theme('height.the-header')-theme('margin.the-header')-theme('margin.5'))] items-center justify-center mb-5">
    <span class="flex justify-center text-center text-4xl font-medium">Выберите механика</span>
    <div class="relative">
      <div :class="{'border-green': isMechanicsVisible}"
           class="border-2 border-gray-a1a4ad mt-7 flex justify-between w-[705px]">
        <div @click="isMechanicsVisible = !isMechanicsVisible"
             class="flex w-full items-center justify-between h-[80px] pl-5 pr-5 cursor-pointer">
          <span :class="{'!text-black': isMechanicSelected}" class="text-gray-a1a4ad text-2xl">Выберите механика</span>
          <SvgIcon :class="{'rotate-180':isMechanicsVisible}" name="arrow-down" class="w-[25px] h-[15px]" />
        </div>
      </div>
      <div v-if="isMechanicsVisible" class="flex flex-col">
        <div
          class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white">
          БРИК-3П-126
        </div>
        <div
          class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white">
          БИНДЖ-ЛЙА-РЕТТЕ
        </div>
        <div
          class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white">
          ДЕМО-ЛАА-РЕТЙТЕ
        </div>
        <div
          class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white">
          КИРКГИ-МЛА-РЫВВЕТТЕ
        </div>
        <div
          class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white">
          КИРКГИ-МЛА-РЫВВЕТТЕ
        </div>
      </div>
    </div>
    <ButtonGreen v-if="isMechanicSelected" class="w-[705px]">Подтвердить и продолжить</ButtonGreen>
  </section>
</template>

<script setup>
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import ButtonGreen from '@/components/Button/ButtonGreen.vue'
import { ref } from 'vue'

let isMechanicSelected = ref(false)
let isMechanicsVisible = ref(false)
</script>
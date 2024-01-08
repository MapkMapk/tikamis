<template>
  <TheHeader />
  <section :class="{'!h-auto':isMechanicsVisible}"
           class="flex flex-col w-full h-[calc(100vh-theme('height.the-header')-theme('padding.10')-theme('margin.10'))] items-center justify-center mb-10 pt-10">
    <span class="flex justify-center text-center text-4xl font-medium">Добавить услуги</span>
    <div class="relative">
      <div :class="{'border-green': isMechanicsVisible}"
           class="border-2 border-gray-a1a4ad mt-7 flex justify-between w-[705px]">
        <div @click="isMechanicsVisible = !isMechanicsVisible"
             class="flex w-full items-center h-[80px] pl-5 pr-5 cursor-pointer">
          <SvgIcon name="loop" class="w-[25px] h-[25px] mr-5" />
          <input type="text" placeholder="Начните вводить название услуги" class="text-2xl">
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
        <div
          class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white">
          КИРКГИ-МЛА-РЫВВЕТТЕ
        </div>
        <div
          class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white">
          КИРКГИ-МЛА-РЫВВЕТТЕ
        </div>
        <div
          class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white">
          КИРКГИ-МЛА-РЫВВЕТТЕ
        </div>
        <div
          class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white">
          КИРКГИ-МЛА-РЫВВЕТТЕ
        </div>
        <div
          class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white">
          КИРКГИ-МЛА-РЫВВЕТТЕ
        </div>
        <div
          class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white">
          КИРКГИ-МЛА-РЫВВЕТТЕ
        </div>
        <div
          class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white">
          КИРКГИ-МЛА-РЫВВЕТТЕ
        </div>
        <div
          class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white">
          КИРКГИ-МЛА-РЫВВЕТТЕ
        </div>
        <div
          class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white">
          КИРКГИ-МЛА-РЫВВЕТТЕ
        </div>
        <div
          class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white">
          КИРКГИ-МЛА-РЫВВЕТТЕ
        </div>
        <div
          class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white">
          КИРКГИ-МЛА-РЫВВЕТТЕ
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
import ButtonGreen from '@/components/BaseButton/BaseButton.vue'
</script>
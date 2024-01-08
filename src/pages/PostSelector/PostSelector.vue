<template>
  <TheHeader />
  <section :class="{'!h-auto':isPostsVisible}"
           class="flex flex-col w-full h-[calc(100vh-theme('height.the-header')-theme('padding.10')-theme('margin.10'))] items-center justify-center mb-10 pt-10">
    <span class="flex justify-center text-center text-4xl font-medium">Выберите номер поста</span>
    <div class="relative">
      <div :class="{'border-green': isPostsVisible}"
           class="border-2 border-gray-a1a4ad mt-7 flex justify-between w-[337px]">
        <div @click="isPostsVisible = !isPostsVisible"
             class="flex w-full items-center justify-between h-[80px] pl-5 pr-5 cursor-pointer">
          <span :class="{'!text-black': isPostSelected}" class="text-gray-a1a4ad text-2xl">Номер поста</span>
          <SvgIcon :class="{'rotate-180':isPostsVisible}" name="arrow-down" class="w-[25px] h-[15px]" />
        </div>
      </div>
      <div v-if="isPostsVisible" class="flex flex-col">
        <div class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white">БРИК-3П-126</div>
        <div class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white">БИНДЖ-ЛЙА-РЕТТЕ
        </div>
        <div class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white">ДЕМО-ЛАА-РЕТЙТЕ
        </div>
        <div class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white">
          КИРКГИ-МЛА-РЫВВЕТТЕ
        </div>
        <div class="border-t-0 flex items-center pl-5 pr-5 h-[76px] border border-gray-a1a4ad cursor-pointer hover:bg-gray-2c2d2f hover:text-white">
          КИРКГИ-МЛА-РЫВВЕТТЕ
        </div>
      </div>
    </div>
    <BaseButton class="w-[337px] bg-green text-white mt-[30px]">Войти</BaseButton>
  </section>
</template>
<script setup>
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'

let isPostSelected = ref(false)
let isPostsVisible = ref(false)

</script>
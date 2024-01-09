<template>
  <TheHeader />
<!--  h-[calc(100vh-theme('height.the-header')-theme('padding.10')-theme('margin.10'))]-->
  <section
    class="flex flex-col w-full h-auto items-center justify-center mb-10 pt-10">
    <span class="flex justify-center text-center text-4xl font-medium">Добавить услуги</span>
    <div class="relative container w-full">
      <div
        class="border-2 border-gray-a1a4ad mt-7 flex justify-between">
        <div
          class="flex w-full items-center h-[80px] px-[30px] cursor-pointer">
          <SvgIcon name="loop" class="w-6 h-6 mr-5" />
          <input type="text" placeholder="Начните вводить название услуги" class="w-full text-2xl mr-5">
          <SvgIcon name="cross-in-circle" class="w-6 h-6 ml-auto" />
        </div>
      </div>
      <div class="absolute w-[calc(100%-60px)] flex flex-col">
        <div
          class="border-t-0 pt-2 flex items-center px-[30px] border-l border-r border-gray-a1a4ad flex-wrap">
          <div class="flex justify-center items-center mt-1 mb-1 px-5 py-3 bg-gray-2c2d2f rounded-full whitespace-nowrap mr-2.5">
            <div class="text-white text-sm mr-2">Проверка
              состояния
            </div>
            <SvgIcon name="cross" class="w-3 h-3" />
          </div>
          <div class="flex justify-center items-center mt-1 mb-1 px-5 py-3 bg-gray-2c2d2f rounded-full whitespace-nowrap mr-2.5">
            <div class="text-white text-sm mr-2">Чистка салона
            </div>
            <SvgIcon name="cross" class="w-3 h-3" />
          </div>
          <div class="flex justify-center items-center mt-1 mb-1 px-5 py-3 bg-gray-2c2d2f rounded-full whitespace-nowrap mr-2.5">
            <div class="text-white text-sm mr-2">Проверка тормозных шлангов
            </div>
            <SvgIcon name="cross" class="w-3 h-3" />
          </div>
          <div class="flex justify-center items-center mt-1 mb-1 px-5 py-3 bg-gray-2c2d2f rounded-full whitespace-nowrap mr-2.5">
            <div class="text-white text-sm mr-2">Замена шин
            </div>
            <SvgIcon name="cross" class="w-3 h-3" />
          </div>
          <div class="flex justify-center items-center mt-1 mb-1 px-5 py-3 bg-gray-2c2d2f rounded-full whitespace-nowrap mr-2.5">
            <div class="text-white text-sm mr-2">Общая диагностика
            </div>
            <SvgIcon name="cross" class="w-3 h-3" />
          </div>
        </div>
        <div
          class="border-t-0 flex items-center justify-between px-[30px] h-[66px] border border-gray-a1a4ad cursor-pointer">
          <div class="flex items-center">
            <div class="w-[24px] h-[24px] border-2 border-black"></div>
            <div class="ml-6 text-lg">Проверка тормозных шлангов</div>
          </div>
          <div class="">1500 ₽</div>
        </div>
        <div
          class="border-t-0 flex items-center justify-between px-[30px] h-[66px] border border-gray-a1a4ad cursor-pointer">
          <div class="flex items-center">
            <div class="w-[24px] h-[24px] border-2 border-black"></div>
            <div class="ml-6 text-lg">Проверка тормозных шлангов</div>
          </div>
          <div class="">1500 ₽</div>
        </div>
        <div
          class="border-t-0 flex items-center justify-between px-[30px] h-[66px] border border-gray-a1a4ad cursor-pointer">
          <div class="flex items-center">
            <div class="w-[24px] h-[24px] border-2 border-black"></div>
            <div class="ml-6 text-lg">Проверка тормозных шлангов</div>
          </div>
          <div class="">1500 ₽</div>
        </div>
        <div
          class="border-t-0 flex items-center justify-between px-[30px] h-[66px] border border-gray-a1a4ad cursor-pointer">
          <div class="flex items-center">
            <div class="w-[24px] h-[24px] border-2 border-black"></div>
            <div class="ml-6 text-lg">Проверка тормозных шлангов</div>
          </div>
          <div class="">1500 ₽</div>
        </div>
        <div
          class="border-t-0 flex items-center justify-between px-[30px] h-[66px] border border-gray-a1a4ad cursor-pointer">
          <div class="flex items-center">
            <div class="w-[24px] h-[24px] border-2 border-black"></div>
            <div class="ml-6 text-lg">Проверка тормозных шлангов</div>
          </div>
          <div class="">1500 ₽</div>
        </div>
        <div
          class="border-t-0 flex items-center justify-between px-[30px] h-[66px] border border-gray-a1a4ad cursor-pointer">
          <div class="flex items-center">
            <div class="w-[24px] h-[24px] border-2 border-black"></div>
            <div class="ml-6 text-lg">Проверка тормозных шлангов</div>
          </div>
          <div class="">1500 ₽</div>
        </div>
        <div
          class="border-t-0 flex items-center justify-between px-[30px] h-[66px] border border-gray-a1a4ad cursor-pointer">
          <div class="flex items-center">
            <div class="w-[24px] h-[24px] border-2 border-black"></div>
            <div class="ml-6 text-lg">Проверка тормозных шлангов</div>
          </div>
          <div class="">1500 ₽</div>
        </div>
        <div
          class="border-t-0 flex items-center justify-between px-[30px] h-[66px] border border-gray-a1a4ad cursor-pointer">
          <div class="flex items-center">
            <div class="w-[24px] h-[24px] border-2 border-black"></div>
            <div class="ml-6 text-lg">Проверка тормозных шлангов</div>
          </div>
          <div class="">1500 ₽</div>
        </div>
        <div
          class="border-t-0 flex items-center justify-between px-[30px] h-[66px] border border-gray-a1a4ad cursor-pointer">
          <div class="flex items-center">
            <div class="w-[24px] h-[24px] border-2 border-black"></div>
            <div class="ml-6 text-lg">Проверка тормозных шлангов</div>
          </div>
          <div class="">1500 ₽</div>
        </div>
      </div>
    </div>
  </section>
  <BaseButton class="fixed bottom-5 left-[calc(50%-(theme(width.52))/2)] bg-green text-white">Добавить 1 услугу
  </BaseButton>
</template>
<script setup>
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'
</script>
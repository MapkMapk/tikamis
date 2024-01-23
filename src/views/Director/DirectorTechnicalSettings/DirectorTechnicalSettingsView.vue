<template>
  <TheOfficeHeader />
  <div class="w-full flex">
    <TheDirectorMenu />
    <section class="flex flex-1">
      Технические настройки
    </section>
  </div>
</template>
<script setup>
import TheOfficeHeader from '@/components/TheDirectorHeader.vue';
import TheDirectorMenu from '@/components/TheDirectorMenu.vue';
</script>
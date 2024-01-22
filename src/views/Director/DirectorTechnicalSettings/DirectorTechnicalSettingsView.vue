<template>
  <TheOfficeHeader/>
  <div class="w-full flex">
    <TheOfficeMenu v-if="directorBaseStore.isMenuActive" />

  </div>
</template>
<script setup>
import TheOfficeHeader from '@/components/TheOfficeHeader.vue'
import TheOfficeMenu from '@/components/TheOfficeMenu.vue'
import { useDirectorBaseStore } from '@/stores/director/directorBase.js'
const directorBaseStore = useDirectorBaseStore();
</script>
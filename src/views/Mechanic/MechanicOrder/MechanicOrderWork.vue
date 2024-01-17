<template>
  <div
    v-for="work in mechanicOrderStore.works"
    :key="work.id"
    class="flex items-center justify-between px-[30px] border-t h-[80px] border-gray-a1a4ad"
  >
    <span class="text-black text-2xl">{{ work.name }}</span>
    <BaseSvgIcon
      name="trash-bin"
      class="w-[22px] h-[25px] cursor-pointer"
    ></BaseSvgIcon>
  </div>
</template>
<script setup>
import BaseSvgIcon from '@/components/BaseSvgIcon.vue'
import { useMechanicOrderStore } from '@/stores/mechanic/mechanicOrder.js'

// modalBooleanStore.callModal(mechanicOrderStore.removeWork, [work.id])

const mechanicOrderStore = useMechanicOrderStore()
</script>

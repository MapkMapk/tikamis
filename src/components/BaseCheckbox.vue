<template>
  <div
    v-if="!props.isSelected"
    class="w-[24px] h-[24px] border-2 border-black"
  ></div>
  <div
    v-if="props.isSelected"
    class="flex justify-center items-center w-[24px] h-[24px] bg-green"
  >
    <BaseSvgIcon
      name="check-mark-white"
      class="w-4 h-4"
    />
  </div>
</template>
<script setup>
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';

let props = defineProps({
  isSelected: {
    default: false
  }
});
</script>

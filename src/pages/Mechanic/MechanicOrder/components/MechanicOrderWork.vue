<template>
  <div class="flex items-center justify-between px-[30px] border-t h-[80px] border-gray-a1a4ad">
    <span class="text-black text-2xl">{{ name }}</span>
    <SvgIcon @click="removeService" name="trash-bin" class="w-[22px] h-[25px] cursor-pointer"></SvgIcon>
  </div>
</template>
<script setup>
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'

defineEmits([''])

defineProps({
  name: {
    type: String,
    required: true
  },
})

function removeService() {

}
</script>
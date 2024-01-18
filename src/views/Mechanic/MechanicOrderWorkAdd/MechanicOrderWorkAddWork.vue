<template>
  <div
    v-if="isVisible"
    @click="emit('toggleWorkSelection', props.index); emit('selectedWorksHandler', isSelected, props.workId)"
    :class="{ 'bg-gray-2c2d2f': isSelected }"
    class="flex items-center justify-between px-[30px] h-[66px] border border-b-gray-a1a4ad border-t-0 border-l-0 border-r-0 last:border-b-0 cursor-pointer"
  >
    <div class="flex items-center">
      <BaseCheckbox :isSelected="props.isSelected" />
      <div
        :class="{ '!text-white': isSelected }"
        class="ml-6 text-lg"
      >
        {{ props.name }}
      </div>
    </div>
    <div :class="{ '!text-white': isSelected }">{{ props.price }} ₽</div>
  </div>
</template>
<script setup>
import BaseCheckbox from '@/components/BaseCheckbox.vue';
import { computed, ref } from 'vue'

let emit = defineEmits(['toggleWorkSelection', 'selectedWorksHandler']);
let props = defineProps({
  name: { required: true },
  price: { required: true },
  index: { required: true },
  isSelected: {required: true},
  workId: {required: true},
  searchInputText: {required: true}
});

let isVisible = computed(() => {
  return props.name.toLowerCase().indexOf(props.searchInputText.toLowerCase()) >= 0
});
</script>

<template>
  <div
    v-if="isWorkVisible && !isWorkIncludedInOrder"
    @click="
      emit('toggleWorkSelection', props.index);
      emit('selectedWorksHandler', isSelected, props.workId);
    "
    :class="{ 'bg-gray-2c2d2f': isSelected }"
    class="flex items-center justify-between px-[30px] min-h-[66px] border border-b-gray-a1a4ad border-t-0 border-l-0 border-r-0 last:border-b-0 cursor-pointer"
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
    <div :class="{ '!text-white': isSelected, 'hidden': !props.price }">{{ props.price }} ₽</div>
  </div>
</template>
<script setup>
import BaseCheckbox from '@/components/BaseCheckbox.vue';
import { useMechanicOrderStore } from '@/stores/mechanic/mechanicOrder.js';
import { computed, ref  } from 'vue';
import { useStore } from '@/stores/main.js';
const Store = useStore();
const CWorks = ref([]);
CWorks.value = Store.workList();

let emit = defineEmits(['toggleWorkSelection', 'selectedWorksHandler']);
let props = defineProps({
  name: { required: true },
  price: { required: true },
  index: { required: true },
  isSelected: { required: true },
  workId: { required: true },
  searchInputText: { required: true }
});

let isWorkVisible = computed(() => {
  return props.name.toLowerCase().indexOf(props.searchInputText.toLowerCase()) >= 0;
});

let isWorkIncludedInOrder = computed(() => {
  for (let i = 0; i < CWorks.value.length; i++) {
    if (props.workId === CWorks.value[i].id) {
      return true;
    }
  }
  return false;
});
</script>

<template>
  <TheHeader />
  <section :class="{'!h-auto':isMechanicsVisible}"
           class="flex flex-col w-full h-[calc(100vh-theme('height.the-header')-theme('padding.10')-theme('margin.10'))] items-center justify-center mb-10 pt-10">
    <h1 class="flex justify-center text-center text-4xl font-medium">Выберите механика</h1>
    <div class="relative">
      <div :class="{'border-green': isMechanicsVisible}"
           class="border-2 border-gray-a1a4ad mt-7 flex justify-between w-[705px]">
        <div @click="isMechanicsVisible = !isMechanicsVisible"
             class="flex w-full items-center justify-between h-[80px] pl-5 pr-5 cursor-pointer">
          <span :class="{'!text-black': isMechanicSelected}" class="text-gray-a1a4ad text-2xl">{{isMechanicSelected ? selectedMechanic.name : "Выберите механика"}}</span>
          <SvgIcon :class="{'rotate-180':isMechanicsVisible}" name="arrow-down" class="w-[25px] h-[15px]" />
        </div>
      </div>
      <div v-if="isMechanicsVisible" class="flex flex-col">
        <MechanicHumanSelectItem v-for="mechanic in mechanics" @back-mechanic="pickMechanic" :key="mechanic.id" :id="mechanic.id" :name="mechanic.name" />
      </div>
    </div>
    <BaseButton v-if="isMechanicSelected" class="w-[705px] bg-green text-white mt-[30px]">Подтвердить и продолжить</BaseButton>
  </section>
</template>

<script setup>
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { computed, ref } from 'vue'
import MechanicHumanSelectItem from '@/pages/Mechanic/MechanicHumanSelect/components/MechanicHumanSelectItem.vue'
import BaseButton from '@/components/BaseButton/BaseButton.vue'

let isMechanicsVisible = ref(false)
let selectedMechanic = ref({id: '', name: ''})
let isMechanicSelected = computed(() => selectedMechanic.value.id !== '');

let mechanics = ref([
  {id: '1пб', name: 'Миша'},
  {id: '2пб', name: 'Гриша'},
  {id: '3пб', name: 'Никита'},
  {id: '4пб', name: 'Алексей'},
  {id: '5пб', name: 'Сергей'},
  {id: '6пб', name: 'Саша'}
]);

function pickMechanic(id, name) {
  selectedMechanic.value.id = id
  selectedMechanic.value.name = name
  isMechanicsVisible.value = false
}
</script>
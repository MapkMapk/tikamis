<template>
  <section
    v-if="props.isVisible"
    class="z-50 flex justify-center items-center fixed w-full h-screen left-0 top-0 bg-gray-848484"
  >
    <div class="flex flex-col items-center bg-white w-[520px]">
      <div class="flex flex-col items-center mt-[70px] mb-[10px] pl-10 pr-10 text-center">
        <span class="font-medium text-3xl">{{ props.mainTitle }}</span>
        <span class="text-lg mt-[15px] leading-7">{{ props.mainText }}</span>
      </div>
      <CINOP :MaxNumber="primaryMaxNumber" :PNumber="primaryCountText" @updatePNumber="updatePrimaryCount"></CINOP>
      <div class="flex w-full mt-auto">
        <BaseButtonFilledRed
          v-if="isWeekend"
          @click="changeWeekend()"
          class="flex-1"
          >Отменить выходной
        </BaseButtonFilledRed>
        
        <BaseButtonFilledDark
          v-if="!isWeekend"
          @click="changeWeekend()"
          class="flex-1"
          >Установить выходной

        </BaseButtonFilledDark>
        <BaseButtonFilledGreen
          @click="handleButtonClick(false)"
          class="flex-1"
          >{{ props.secondaryButtonText }}
        </BaseButtonFilledGreen>
      </div>
    </div>
  </section>
</template>

<script setup>
import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';
import { ref, watchEffect  } from 'vue';
import CINOP from '@/components/CalendarInputNumberOfPosts.vue';
import BaseButtonFilledRed from '@/components/BaseButtonFilledRed.vue';
import BaseButtonFilledDark from '@/components/BaseButtonFilledDark.vue';


let props = defineProps({
  isVisible: Boolean,
  isWeekend: {
    type: Boolean,
    default: false // Устанавливаем значение по умолчанию на false
  },
  mainTitle: String,
  mainText: String,
  primaryButtonComponent: Object,
  primaryCountText: Number,
  primaryMaxNumber: Number,
  day: Number,
  primaryButtonText: String,
  secondaryButtonText: String
});
const emit = defineEmits(['callback', 'updatePNumber']);
const isWeekend = ref(props.isWeekend);
watchEffect(() => {
      isWeekend.value = props.isWeekend;
    });
function changeWeekend(){
  isWeekend.value = !isWeekend.value;
}
function handleButtonClick(value) {
  // Создайте объект данных, который вы хотите передать в родительский компонент
  const updatedData = {
  postNumber: count.value,
  isWeekend: isWeekend.value,
  dayNumber: props.day
  };

  console.log("//===============ModalGreen=================\\");
  console.log(`handleButtonClick data: ${props.primaryCountText} => ${count.value} || ${value}`);
  console.log("\\===============ModalGreen=================//");

  // Отправьте событие в родительский компонент вместе с объектом данных
  //true - выходной
  //false - применить
  emit('updateData', updatedData);
}

const count = ref(0);

function updatePrimaryCount(value) {
  count.value = value;
}
</script>
<script>
export default {
  components: {
    CINOP,
  },
  setup() {
    const parentPNumber = ref(0);

    const updateParentPNumber = (value) => {
      parentPNumber.value = value;
    };

    return {
      parentPNumber,
      updateParentPNumber,
    };
  },
};</script>

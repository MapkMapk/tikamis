<template>
  <section
    v-if="props.isVisible"
    class="z-50 flex justify-center items-center fixed w-full h-screen left-0 top-0 bg-gray-848484"
  >
    <div class="flex relative flex-col items-center bg-white w-[520px]">
      <div @click="close()" style="cursor: pointer; position: absolute;top: 0;right: 0; padding: 15px 20px 0 0;">
      <svg  class="delete-icon"
						xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
						viewBox="0 0 16 16">
						<path
							d="M14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683417 16.0976 1.31658 15.7071 1.70711L9.41421 8L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8 9.41421L1.70711 15.7071C1.31658 16.0976 0.683418 16.0976 0.292894 15.7071C-0.0976312 15.3166 -0.0976312 14.6834 0.292894 14.2929L6.58579 8L0.292894 1.70711C-0.0976306 1.31658 -0.0976306 0.683417 0.292894 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L8 6.58579L14.2929 0.292893Z"
							fill="#A1A4AD" />
					</svg>
      </div>
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
console.log(`isWeekend: ${props.isWeekend}`);
const emit = defineEmits(['callback', 'updatePNumber', 'updateData']);
const isWeekend = ref(props.isWeekend);
watchEffect(() => {
      isWeekend.value = props.isWeekend;
    });
function changeWeekend(){
  isWeekend.value = !isWeekend.value;
  if(!isWeekend.value){
    updatePrimaryCount("grap");
  }
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
function close(){
  emit('callback');
}
const count = ref(props.primaryCountText);

function updatePrimaryCount(value) {
  count.value = value;
  if (value == "grap"){
    count.value = 1;
  }
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

<template>
    <section
      v-if="props.isVisible"
      class="z-50 flex justify-center items-center fixed w-full h-screen left-0 top-0 bg-gray-848484"
    >
      <div class="flex flex-col items-center bg-white w-[520px]">
        <div class="flex flex-col items-end w-full px-[20px] mt-[22px] h-[25px]">
          <svg @click="emit('callback', false)" style="cursor: pointer;" class="delete-icon" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
						<path d="M14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683417 16.0976 1.31658 15.7071 1.70711L9.41421 8L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8 9.41421L1.70711 15.7071C1.31658 16.0976 0.683418 16.0976 0.292894 15.7071C-0.0976312 15.3166 -0.0976312 14.6834 0.292894 14.2929L6.58579 8L0.292894 1.70711C-0.0976306 1.31658 -0.0976306 0.683417 0.292894 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L8 6.58579L14.2929 0.292893Z" fill="#A1A4AD" />
					</svg>
        </div>
        <div class="flex flex-col items-center mt-[23px] mb-[40px] pl-10 pr-10 text-center">
          <!-- Имеется запись -->
          <span class="font-medium text-3xl text-red-500">{{ props.mainTitle }}</span>

          <span class="text-lg mt-[25px] leading-7 texttexttext">{{ props.mainText }}</span>
          <!-- На 8 июня имеется запись. Изменить численность постов невозможно. -->
        </div>
        <div class="flex w-full mt-auto">
          <BaseButtonFilledLight
            @click="emit('callback', false)"
            class="flex-1"
            >
            <!-- Закрыть -->
            {{ props.primaryButtonText }}
          </BaseButtonFilledLight>
        </div>
      </div>
    </section>
  </template>
  <script setup>
  import BaseButtonFilledLight from '@/components/BaseButtonFilledLight.vue';
  import { defineProps, defineEmits, ref } from 'vue';
  
  let emit = defineEmits(['callback']);
  let props = defineProps({
    isVisible: Boolean,
    mainTitle: String,
    mainText: String,
    primaryButtonComponent: Object,
    primaryCountText: String,
    primaryButtonText: String,
    secondaryButtonText: String
  });
  </script>
  <style>
.text-red-500{color:red;}
.texttexttext{
    font-family: Inter;
font-size: 18px;
font-weight: 500;
line-height: 28px;
text-align: center;
color:#080808;
}
</style>
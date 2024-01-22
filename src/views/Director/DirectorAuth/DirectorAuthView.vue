<template>
  <section class="h-screen w-full flex justify-center items-center bg-gray-f5f5f5">
    <div class="flex justify-center items-center w-[531px] bg-white">
      <div class="flex flex-col w-full items-center pt-[44px] pl-[92px] pr-[92px] pb-[70px]">
        <BaseSvgIcon
          name="logo"
          class="w-[86px] h-[84px]"
        />
        <h1 class="text-4xl font-medium pt-6">Панель директора</h1>
        <form class="w-full flex flex-col items-center pt-4">
          <input
            type="text"
            placeholder="Введите логин"
            autocomplete="off"
            @keydown.space.prevent
            v-model="login"
            class="text-lg w-full pl-5 pr-5 pt-4 pb-4 border-gray-a1a4ad placeholder:text-gray-60 text-black border"
          />
          <div class="w-full relative">
            <input
              :type="passwordInputType"
              placeholder="Введите пароль"
              autocomplete="off"
              @keydown.space.prevent
              v-model="password"
              class="text-lg w-full pl-5 pr-5 pt-4 pb-4 border-gray-a1a4ad placeholder:text-gray-60 text-black border mt-5"
            />
            <BaseSvgIcon
              @click="isPasswordVisible = !isPasswordVisible"
              name="password-eye"
              class="absolute w-6 h-6 right-5 top-1/2 cursor-pointer transition-all"
            ></BaseSvgIcon>
          </div>
          <BaseButtonFilledGreen
            @click.prevent="AuthHandler"
            class="w-full bg-green text-white mt-[30px]"
            >Войти
          </BaseButtonFilledGreen>
          <div
            v-if="errorText"
            class="text-red mt-4"
          >
            {{ errorText }}
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
// import router from '@/router/index.js';
import BaseSvgIcon from '@/components/BaseSvgIcon.vue';
import BaseButtonFilledGreen from '@/components/BaseButtonFilledGreen.vue';

let login = ref('');
let password = ref('');
let errorText = ref('');
let isPasswordVisible = ref(false);
let passwordInputType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));

async function AuthHandler() {
  // let data = await MechanicApiAuthenticatePanel(login.value, password.value, postNumber.value);
  // if (data) {
  //   mechanicUserStore.accessToken = data.accessToken;
  //   mechanicUserStore.refreshToken = data.refreshToken;
  //   await router.push('/mechanic/human-select');
  // } else {
  //   updateStep(1);
  // }
}
</script>
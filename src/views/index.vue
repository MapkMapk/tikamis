<template>
  <section class="h-screen flex flex-col justify-center items-center">
    <router-link
      to="/sadmin/auth"
      class="bg-green font-semibold text-white w-[300px] flex justify-center items-center rounded mb-4 py-5"
    >
    Суперадмин
    </router-link>
    <router-link
      to="/director/auth"
      class="bg-green font-semibold text-white w-[300px] flex justify-center items-center rounded mb-4 py-5"
    >
      Директор
    </router-link>
    <router-link
      to="/mechanic/auth"
      class="bg-green font-semibold text-white w-[300px] flex justify-center items-center rounded mb-4 py-5"
    >
      Механик
    </router-link>
    <router-link
      to="/monitor/"
      class="bg-green font-semibold text-white w-[300px] flex justify-center items-center rounded mb-4 py-5"
    >
      Монитор очереди
    </router-link>
  </section>
</template>
<script setup></script>

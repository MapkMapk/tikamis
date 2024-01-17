<template>
  <section class="h-screen flex flex-col justify-center items-center">
    <router-link
      to="/mechanic/auth"
      class="bg-green font-semibold text-white w-[300px] flex justify-center items-center rounded mb-4 py-5"
    >
      Mechanic
    </router-link>
    <router-link
      to="/"
      class="bg-red font-semibold text-white w-[300px] flex justify-center items-center rounded mb-4 py-5"
    >
      Director
    </router-link>
    <router-link
      to="/"
      class="bg-red font-semibold text-white w-[300px] flex justify-center items-center rounded mb-4 py-5"
    >
      Sadmin
    </router-link>
  </section>
</template>
<script setup></script>

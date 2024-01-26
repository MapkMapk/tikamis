<template>
  <AuthPanel title="Панель админа" :is-error-visible="isErrorVisible" @authenticate="authenticate" />
</template>
<script setup>
import AuthPanel from '@/components/AuthPanel.vue';
import { useSadminUserStore } from '@/stores/sadmin/sadminUser.js'
import { sadminApiClient } from '@/api/sadminApiClient.js'
import { ref } from 'vue';

const sadminUserStore = useSadminUserStore();
let isErrorVisible = ref(false);

async function authenticate(login, password) {
  let {data} = await sadminApiClient.post('/login', {login, password})
  if (data.accessToken && data.refreshToken) {
    sadminUserStore.accessToken = data.accessToken;
    sadminUserStore.refreshToken = data.refreshToken
    isErrorVisible.value = false
  } else {
    isErrorVisible.value = true
  }
}
</script>

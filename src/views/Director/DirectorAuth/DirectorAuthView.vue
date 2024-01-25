<template>
  <AuthPanel title="Панель директора" @authenticate="authenticate" :is-error-visible="isErrorVisible" />
</template>
<script setup>
import AuthPanel from '@/components/AuthPanel.vue';
import { directorApiClient } from '@/api/directorApiClient.js'
import { useDirectorUserStore } from '@/stores/director/directorUser.js'
import { ref } from 'vue'

const directorUserStore = useDirectorUserStore()
let isErrorVisible = ref(false)

async function authenticate(login, password) {
  let {data} = await directorApiClient.post('/login', {login, password})
  if (data.accessToken && data.refreshToken) {
    directorUserStore.accessToken = data.accessToken;
    directorUserStore.refreshToken = data.refreshToken
    isErrorVisible.value = false
  } else {
    isErrorVisible.value = true
  }
}
</script>

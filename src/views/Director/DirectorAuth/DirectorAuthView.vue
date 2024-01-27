<template>
  <AuthPanel title="Панель директора" @authenticate="authenticate" :is-error-visible="isErrorVisible" />
</template>
<script setup>
import AuthPanel from '@/components/AuthPanel.vue';
import { useDirectorUserStore } from '@/stores/director/directorUser.js'
import directorApiLogin from '@/api/director/directorApiLogin.js'
import { ref } from 'vue'

const directorUserStore = useDirectorUserStore()
let isErrorVisible = ref(false)

async function authenticate(login, password) {
  let data = directorApiLogin(login, password)
  if (data.accessToken && data.refreshToken) {
    directorUserStore.accessToken = data.accessToken;
    directorUserStore.refreshToken = data.refreshToken
    isErrorVisible.value = false
  } else {
    isErrorVisible.value = true
  }
}
</script>

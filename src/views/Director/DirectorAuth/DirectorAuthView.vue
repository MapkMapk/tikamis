<template>
  <AuthPanel title="Панель директора" @authenticate="authenticate" />
</template>
<script setup>
import AuthPanel from '@/components/AuthPanel.vue';
import { directorApiClient } from '@/api/directorApiClient.js'

function authenticate(login, password) {
  directorApiClient.post('/login', {login, password})
}
</script>

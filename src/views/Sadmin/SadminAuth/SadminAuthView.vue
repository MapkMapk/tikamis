<template>
  <AuthPanel title="Панель админа" @authenticate="authenticate" />
</template>
<script setup>
import AuthPanel from '@/components/AuthPanel.vue';

function authenticate(login, password) {

}
</script>

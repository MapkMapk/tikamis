<template>
  <TheAuthPanel title="Панель админа" @authenticate="authenticate" />
</template>
<script setup>
import TheAuthPanel from '@/components/TheAuthPanel.vue';

function authenticate() {

}
</script>

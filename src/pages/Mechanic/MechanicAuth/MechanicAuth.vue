<template>
  <MechanicAuthLoginAndPassForm v-if="currentStep === 1" @handler="loginAndPassFormHandler" />
  <MechanicAuthSelectPost v-if="currentStep === 2" @handler="selectPostHandler" />
</template>

<script setup>
import MechanicAuthLoginAndPassForm from '@/pages/Mechanic/MechanicAuth/components/MechanicAuthLoginAndPassForm.vue'
import MechanicAuthSelectPost from '@/pages/Mechanic/MechanicAuth/components/MechanicAuthSelectPost.vue'
import MechanicApiAuthenticatePanel from '@/api/mechanic/mechanicApiAuthenticatePanel.js'
import { ref } from 'vue';

let currentStep = ref(1)
let login = ref('');
let password = ref('')
let postNumber = ref('')

function loginAndPassFormHandler(newLogin, newPassword) {
  currentStep.value = 2;
  login.value = newLogin
  password.value = newPassword
}

function selectPostHandler(newPostNumber) {
  postNumber.value = newPostNumber
  console.log("Login", login.value)
  console.log("Password", password.value)
  console.log("PostNumber", postNumber.value)
  mainHandler()
}

function mainHandler() {
  // MechanicApiAuthenticatePanel(login.value, password.value, postNumber.value)
}

</script>
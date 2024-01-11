<template>
  <MechanicAuthLoginAndPassForm v-if="currentStep === 1" @return-login-and-password="setLoginAndPassword" />
  <MechanicAuthSelectPost v-if="currentStep === 2" @return-post-number="setPostNumber" />
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

function setLoginAndPassword(newLogin, newPassword) {
  currentStep.value = 2;
  login.value = newLogin
  password.value = newPassword
}

function setPostNumber(newPostNumber) {
  postNumber.value = newPostNumber
  AuthHandler()
}

function AuthHandler() {
  MechanicApiAuthenticatePanel(login.value, password.value, postNumber.value)
}

</script>
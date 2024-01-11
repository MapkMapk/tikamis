import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export const mechanicUser = defineStore('order', () => {
  let tokens = {
    access: '',
    refresh: ''
  }

  return {tokens}
})
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useResetPasswordStore = defineStore('authForm', () => {
  const email = ref<string>('')
  const password = ref<string>('')
  const otpValue = ref<string[]>([])
  const refCode = ref<string>('')

  const handleComplete = (e: string[]) => {
    alert(e.join(''))
  }

  const clearStore = () => {
    email.value = ''
    password.value = ''
    otpValue.value = []
    refCode.value = ''
  }

  return {
    email,
    password,
    otpValue,
    refCode,
    handleComplete,
    clearStore,
  }
})

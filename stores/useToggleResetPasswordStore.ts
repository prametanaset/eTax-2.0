// stores/useToggleResetPasswordStores.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToggleResetPasswordStores = defineStore('switchResetPassword', () => {
  const resetPassword = ref(false)
  const isLogin = ref(true)

  const clear = () => {
    resetPassword.value = false
    isLogin.value = true
  }

  return {
    resetPassword,
    isLogin,
    clear
  }
})

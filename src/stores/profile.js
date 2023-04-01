import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useProfile = defineStore('profile', () => {
  const currentUser = reactive({
    name: null,
    email: null
  })

  function fetchCurrentUser() {
    return window.axios.get('profile').then((response) => {
      currentUser.name = response.data.name
      currentUser.email = response.data.email
    })
  }

  function resetCurrentUser() {
    currentUser.name = null
    currentUser.email = null
  }

  return { currentUser, fetchCurrentUser, resetCurrentUser }
})

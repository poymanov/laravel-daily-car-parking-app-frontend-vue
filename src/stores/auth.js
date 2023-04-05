import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useProfile } from '@/stores/profile'

export const useAuth = defineStore('auth', () => {
  const router = useRouter()
  const accessToken = useStorage('access_token', '')
  const check = computed(() => !!accessToken.value)
  const profile = useProfile()

  function setAccessToken(value) {
    accessToken.value = value
    window.axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken.value}`
  }

  function login(accessToken, origin = 'login') {
    setAccessToken(accessToken)

    profile.fetchCurrentUser()

    if (origin === 'login') return router.push({ name: 'parkings.active' })
    if (origin === 'register') return router.push({ name: 'vehicles.index' })
  }

  function destroyTokenAndRedirectTo(routeName = 'login') {
    setAccessToken(null)
    router.push({ name: routeName })
  }

  async function logout() {
    return window.axios.post('auth/logout').finally(() => {
      profile.resetCurrentUser()
      destroyTokenAndRedirectTo()
    })
  }

  return { login, logout, check, destroyTokenAndRedirectTo }
})

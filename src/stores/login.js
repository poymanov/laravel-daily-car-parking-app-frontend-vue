import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from '@/stores/auth'

export const useLogin = defineStore('login', () => {
  const loading = ref(false)
  const errors = reactive({})
  const auth = useAuth()

  const form = reactive({
    email: '',
    password: '',
    remember: false
  })

  function resetForm() {
    form.email = ''
    form.password = ''
    form.remember = false

    errors.value = {}
  }

  function handleSubmit() {
    if (loading.value) return

    loading.value = true
    errors.value = {}

    return window.axios
      .post('auth/login', form)
      .then((response) => {
        auth.login(response.data.access_token)
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors
        }

        if (error.response.status === 400) {
          alert(error.response.data.message)
        }
      })
      .finally(() => {
        form.password = ''
        loading.value = false
      })
  }

  return { form, errors, loading, resetForm, handleSubmit }
})

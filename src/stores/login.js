import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from '@/stores/auth'

export const useLogin = defineStore('login', () => {
  const loading = ref(false)
  const status = ref('')
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
    status.value = ''

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
          status.value = error.response.data.message
        }
      })
      .finally(() => {
        form.password = ''
        loading.value = false
      })
  }

  return { form, status, errors, loading, resetForm, handleSubmit }
})

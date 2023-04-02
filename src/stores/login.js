import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from '@/stores/auth'
import { useFormStatus } from '@/composables/formStatus'
import { useFormLoading } from '@/composables/formLoading'

export const useLogin = defineStore('login', () => {
  const formLoading = useFormLoading()
  const loading = formLoading.loading

  const formStatus = useFormStatus()
  const status = formStatus.status

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

    formStatus.reset()

    errors.value = {}
  }

  function handleSubmit() {
    if (loading.value) return

    formLoading.on()

    errors.value = {}

    formStatus.reset()

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
          formStatus.createError(error.response.data.message)
        }
      })
      .finally(() => {
        form.password = ''
        formLoading.off()
      })
  }

  return { form, status, errors, loading, resetForm, handleSubmit }
})

import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from '@/stores/auth'
import { useFormStatus } from '@/composables/formStatus'
import { useFormLoading } from '@/composables/formLoading'
import { useFormErrors } from '@/composables/formErrors'

export const useLogin = defineStore('login', () => {
  const formLoading = useFormLoading()
  const loading = formLoading.loading

  const formStatus = useFormStatus()
  const status = formStatus.status

  const formErrors = useFormErrors()
  const errors = formErrors.errors

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
    formErrors.reset()
  }

  function handleSubmit() {
    if (loading.value) return

    formLoading.on()

    formErrors.reset()
    formStatus.reset()

    return window.axios
      .post('auth/login', form)
      .then((response) => {
        auth.login(response.data.access_token)
      })
      .catch((error) => {
        if (error.response.status === 422) {
          formErrors.add(error.response.data.errors)
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

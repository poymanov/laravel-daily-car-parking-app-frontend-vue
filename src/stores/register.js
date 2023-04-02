import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from '@/stores/auth'
import { useFormStatus } from '@/composables/formStatus'
import { useFormLoading } from '@/composables/formLoading'
import { useFormErrors } from '@/composables/formErrors'

export const useRegister = defineStore('register', () => {
  const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const formStatus = useFormStatus()
  const status = formStatus.status

  const formLoading = useFormLoading()
  const loading = formLoading.loading

  const formErrors = useFormErrors()
  const errors = formErrors.errors

  const auth = useAuth()

  function resetForm() {
    form.name = ''
    form.email = ''
    form.password = ''
    form.password_confirmation = ''

    formStatus.reset()
    formErrors.reset()
  }

  function handleSubmit() {
    if (loading.value) return

    formLoading.on()

    formErrors.reset()
    formStatus.reset()

    return window.axios
      .post('auth/register', form)
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
        form.password_confirmation = ''

        formLoading.off()
      })
  }

  return { form, errors, loading, resetForm, handleSubmit, status }
})

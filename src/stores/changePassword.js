import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useFormStatus } from '@/composables/formStatus'
import { useFormLoading } from '@/composables/formLoading'
import { useFormErrors } from '@/composables/formErrors'

export const useChangePassword = defineStore('change-password', () => {
  const form = reactive({
    current_password: '',
    password: '',
    password_confirmation: ''
  })

  const formLoading = useFormLoading()
  const loading = formLoading.loading

  const formStatus = useFormStatus()
  const status = formStatus.status

  const formErrors = useFormErrors()
  const errors = formErrors.errors

  function resetForm() {
    form.current_password = ''
    form.password = ''
    form.password_confirmation = ''

    formStatus.reset()
    formErrors.reset()
  }

  function updatePassword() {
    if (loading.value) return

    formStatus.reset()

    formLoading.on()
    formErrors.reset()

    return window.axios
      .patch('profile/password', form)
      .then(() => {
        formStatus.createSuccess('Password has been updated.')
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
        form.current_password = ''
        form.password = ''
        form.password_confirmation = ''
        formLoading.off()
      })
  }

  return { form, errors, loading, resetForm, updatePassword, status }
})

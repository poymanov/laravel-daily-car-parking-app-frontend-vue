import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useFormContent } from '@/composables/formContent/formContent'

export const useChangePassword = defineStore('change-password', () => {
  const formContent = useFormContent()
  const { formStatus, formLoading, formErrors } = formContent.getContentComponents()
  const { status, loading, errors } = formContent.getContentItems()

  const form = reactive({
    current_password: '',
    password: '',
    password_confirmation: ''
  })

  function resetForm() {
    form.current_password = ''
    form.password = ''
    form.password_confirmation = ''

    formContent.reset()
  }

  function updatePassword() {
    if (loading.value) return

    formLoading.on()
    formContent.reset()

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

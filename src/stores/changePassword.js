import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useFormStatus } from '@/composables/formStatus'

export const useChangePassword = defineStore('change-password', () => {
  const loading = ref(false)
  const errors = reactive({})
  const form = reactive({
    current_password: '',
    password: '',
    password_confirmation: ''
  })

  const formStatus = useFormStatus()
  const status = formStatus.status

  function resetForm() {
    form.current_password = ''
    form.password = ''
    form.password_confirmation = ''

    formStatus.reset()

    errors.value = {}
  }

  function updatePassword() {
    if (loading.value) return

    formStatus.reset()

    loading.value = true
    errors.value = {}

    return window.axios
      .patch('profile/password', form)
      .then(() => {
        formStatus.createSuccess('Password has been updated.')
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
        form.current_password = ''
        form.password = ''
        form.password_confirmation = ''
        loading.value = false
      })
  }

  return { form, errors, loading, resetForm, updatePassword, status }
})

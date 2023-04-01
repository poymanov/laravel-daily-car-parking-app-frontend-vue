import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useChangePassword = defineStore('change-password', () => {
  const loading = ref(false)
  const errors = reactive({})
  const form = reactive({
    current_password: '',
    password: '',
    password_confirmation: ''
  })

  const status = ref({
    type: null,
    message: null
  })

  function resetForm() {
    form.current_password = ''
    form.password = ''
    form.password_confirmation = ''

    status.value = {
      type: null,
      message: null
    }

    errors.value = {}
  }

  function updatePassword() {
    if (loading.value) return

    status.value = {
      type: null,
      message: null
    }

    loading.value = true
    errors.value = {}

    return window.axios
      .patch('profile/password', form)
      .then(() => {
        status.value = {
          type: 'success',
          message: 'Password has been updated.'
        }
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors
        }

        if (error.response.status === 400) {
          status.value = {
            type: 'error',
            message: error.response.data.message
          }
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

import { reactive, ref } from 'vue'
import { defineStore } from 'pinia/dist/pinia'

export const useRegister = defineStore('register', () => {
  const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const loading = ref(false)

  const errors = reactive({})

  function resetForm() {
    form.name = ''
    form.email = ''
    form.password = ''
    form.password_confirmation = ''

    errors.value = {}
  }

  function handleSubmit() {
    if (loading.value) return

    loading.value = true
    errors.value = {}

    return window.axios
      .post('auth/register', form)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors
        }
      })
      .finally(() => {
        form.password = ''
        form.password_confirmation = ''
        loading.value = false
      })
  }

  return { form, errors, loading, resetForm, handleSubmit }
})

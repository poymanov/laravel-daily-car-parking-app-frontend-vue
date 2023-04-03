import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from '@/stores/auth'
import { useFormContent } from '@/composables/formContent/formContent'

export const useRegister = defineStore('register', () => {
  const formContent = useFormContent()
  const { formStatus, formLoading, formErrors } = formContent.getContentComponents()
  const { status, loading, errors } = formContent.getContentItems()

  const form = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const auth = useAuth()

  function resetForm() {
    form.name = ''
    form.email = ''
    form.password = ''
    form.password_confirmation = ''

    formContent.reset()
  }

  function handleSubmit() {
    if (loading.value) return

    formLoading.on()

    formContent.reset()

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

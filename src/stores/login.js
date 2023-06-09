import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useAuth } from '@/stores/auth'
import { useFormContent } from '@/composables/formContent/formContent'

export const useLogin = defineStore('login', () => {
  const formContent = useFormContent()
  const { formStatus, formLoading, formErrors } = formContent.getContentComponents()
  const { status, loading, errors } = formContent.getContentItems()

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

    formContent.reset()
  }

  function handleSubmit() {
    if (loading.value) return

    formLoading.on()

    formContent.reset()

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

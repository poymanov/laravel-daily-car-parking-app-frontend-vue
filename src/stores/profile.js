import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useFormStatus } from '@/composables/formStatus'
import { useFormLoading } from '@/composables/formLoading'
import { useFormErrors } from '@/composables/formErrors'

export const useProfile = defineStore('profile', () => {
  const formLoading = useFormLoading()
  const loading = formLoading.loading

  const formStatus = useFormStatus()
  const status = formStatus.status

  const formErrors = useFormErrors()
  const errors = formErrors.errors

  const currentUser = reactive({
    name: null,
    email: null
  })

  const form = reactive({
    name: null,
    email: null
  })

  function resetForm() {
    form.name = null
    form.email = null

    formStatus.reset()
    formErrors.reset()
  }

  async function fetchCurrentUser() {
    return window.axios.get('profile').then((response) => {
      currentUser.name = response.data.name
      currentUser.email = response.data.email
    })
  }

  function resetCurrentUser() {
    currentUser.name = null
    currentUser.email = null
  }

  async function fetchProfile() {
    return window.axios.get('profile').then((response) => {
      form.name = response.data.name
      form.email = response.data.email
    })
  }

  function updateProfile() {
    if (loading.value) return

    formLoading.on()

    formErrors.reset()
    formStatus.reset()

    return window.axios
      .patch('profile', form)
      .then((response) => {
        form.name = response.data.name
        form.email = response.data.email
        formStatus.createSuccess('Profile has been updated')
      })
      .catch((error) => {
        if (error.response.status === 422) {
          formErrors.add(error.response.data.errors)
        }

        if (error.response.status === 400) {
          formStatus.createSuccess(error.response.data.message)
        }
      })
      .finally(() => {
        formLoading.off()
      })
  }

  return {
    currentUser,
    fetchCurrentUser,
    resetCurrentUser,
    form,
    loading,
    errors,
    resetForm,
    status,
    fetchProfile,
    updateProfile
  }
})

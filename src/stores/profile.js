import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useProfile = defineStore('profile', () => {
  const loading = ref(false)
  const status = ref({
    type: null,
    message: null
  })
  const errors = reactive({})

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

    status.value = {
      type: null,
      message: null
    }

    errors.value = {}
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

    loading.value = true
    errors.value = {}
    status.value = {
      type: null,
      message: null
    }

    return window.axios
      .patch('profile', form)
      .then((response) => {
        form.name = response.data.name
        form.email = response.data.email
        status.value = {
          type: 'success',
          message: 'Profile has been updated'
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
        loading.value = false
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

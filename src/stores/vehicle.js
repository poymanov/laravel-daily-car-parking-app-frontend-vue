import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useFormContent } from '@/composables/formContent/formContent'
import { useRouter } from 'vue-router'

export const useVehicle = defineStore('vehicle', () => {
  const formContent = useFormContent()
  const { formStatus, formLoading, formErrors } = formContent.getContentComponents()
  const { status, loading, errors } = formContent.getContentItems()
  const router = useRouter()

  const form = reactive({
    plate_number: null,
    description: null
  })

  function resetForm() {
    form.plate_number = null
    form.description = null

    formContent.reset()
  }

  function storeVehicle() {
    if (loading.value) return

    formLoading.on()
    formContent.reset()

    return window.axios
      .post('vehicles', form)
      .then(() => {
        router.push({ name: 'vehicles.index' })
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
        formLoading.off()
      })
  }

  return { form, errors, loading, resetForm, storeVehicle, status }
})

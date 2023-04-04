import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useFormContent } from '@/composables/formContent/formContent'
import { useRouter } from 'vue-router'

export const useVehicle = defineStore('vehicle', () => {
  const formContent = useFormContent()
  const { formStatus, formLoading, formErrors } = formContent.getContentComponents()
  const { status, loading, errors } = formContent.getContentItems()
  const router = useRouter()

  const vehicles = ref([])

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

  function updateVehicle(vehicle) {
    if (loading.value) return

    formLoading.on()
    formContent.reset()

    window.axios
      .patch(`vehicles/${vehicle.id}`, form)
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

  function getVehicle(vehicle) {
    window.axios.get(`vehicles/${vehicle.id}`).then((response) => {
      form.plate_number = response.data.plate_number
      form.description = response.data.description
    })
  }

  function getVehicles() {
    return window.axios.get('vehicles').then((response) => (vehicles.value = response.data))
  }

  return {
    form,
    errors,
    loading,
    resetForm,
    storeVehicle,
    status,
    vehicles,
    getVehicles,
    updateVehicle,
    getVehicle
  }
})

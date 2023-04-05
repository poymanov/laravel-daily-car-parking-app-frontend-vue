import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useFormContent } from '@/composables/formContent/formContent'

export const useParking = defineStore('parking', () => {
  const formContent = useFormContent()
  const { formStatus, formLoading, formErrors } = formContent.getContentComponents()
  const { status, loading, errors } = formContent.getContentItems()
  const router = useRouter()
  const parkings = ref([])
  const stoppedParkings = ref([])
  const parkingDetails = ref({})

  const form = reactive({
    vehicle_id: null,
    zone_id: null
  })

  function resetForm() {
    form.vehicle_id = null
    form.zone_id = null

    formContent.reset()
  }

  function startParking() {
    if (loading.value) return

    formLoading.on()
    formContent.reset()

    return window.axios
      .post('parkings', form)
      .then(() => {
        router.push({ name: 'parkings.active' })
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

  function stopParking(parking) {
    window.axios.patch(`parkings/${parking.id}`).then(getActiveParkings)
  }

  function getActiveParkings() {
    return window.axios.get('parkings/active').then((response) => {
      parkings.value = response.data
    })
  }

  function getStoppedParkings() {
    return window.axios.get('parkings/stopped').then((response) => {
      stoppedParkings.value = response.data
    })
  }

  function resetParkingDetails() {
    parkingDetails.value = {}
  }

  function getParking(parking) {
    return window.axios.get(`parkings/${parking.id}`).then((response) => {
      parkingDetails.value = response.data
    })
  }

  return {
    form,
    status,
    errors,
    loading,
    resetForm,
    startParking,
    stopParking,
    parkings,
    getActiveParkings,
    stoppedParkings,
    getStoppedParkings,
    parking: parkingDetails,
    getParking,
    resetParkingDetails
  }
})

import { ref } from 'vue'

export function useFormStatus() {
  const status = ref({
    type: null,
    message: null
  })

  function reset() {
    status.value = {
      type: null,
      message: null
    }
  }

  function createSuccess(message) {
    modifyStatus('success', message)
  }

  function createError(message) {
    modifyStatus('error', message)
  }

  function modifyStatus(type, message) {
    status.value = {
      type: type,
      message: message
    }
  }

  return { status, reset, createSuccess, createError }
}

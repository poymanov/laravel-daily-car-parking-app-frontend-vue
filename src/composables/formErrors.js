import { reactive } from 'vue'

export function useFormErrors() {
  const errors = reactive({})

  function reset() {
    errors.value = {}
  }

  function add(data) {
    errors.value = data
  }

  return { errors, reset, add }
}

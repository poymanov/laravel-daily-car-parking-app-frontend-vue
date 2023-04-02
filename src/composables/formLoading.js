import { ref } from 'vue'

export function useFormLoading() {
  const loading = ref(false)

  function off() {
    loading.value = false
  }

  function on() {
    loading.value = true
  }

  return { loading, on, off }
}

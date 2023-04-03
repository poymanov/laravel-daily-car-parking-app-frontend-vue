import { useFormStatus } from '@/composables/formContent/formStatus'
import { useFormLoading } from '@/composables/formContent/formLoading'
import { useFormErrors } from '@/composables/formContent/formErrors'

export function useFormContent() {
  const formStatus = useFormStatus()
  const status = formStatus.status

  const formLoading = useFormLoading()
  const loading = formLoading.loading

  const formErrors = useFormErrors()
  const errors = formErrors.errors

  function getContentItems() {
    return { status, loading, errors }
  }

  function getContentComponents() {
    return { formStatus, formLoading, formErrors }
  }

  function reset() {
    formStatus.reset()
    formErrors.reset()
  }

  return { getContentItems, getContentComponents, reset }
}

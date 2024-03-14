import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IError, TError } from '@/models/IError'

export const useErrorStore = defineStore('error', () => {
  const state = ref({
    errors: [] as IError[],
    lastAI: 0,
    timeout: 5000
  })

  const isCritical = computed(() => state.value.errors.some((item) => item.critical))
  const isError = computed(() => state.value.errors.length > 0)

  function setError(err: TError) {
    const currId = state.value.lastAI++
    state.value.errors.push({
      id: currId,
      message: err.message,
      critical: err.critical
    })
    if (!err.critical) {
      setTimeout(() => {
        deleteError(currId)
      }, state.value.timeout)
    }
  }

  function deleteError(id: number) {
    state.value.errors = state.value.errors.filter((item) => item.id !== id)
  }

  return {
    state,
    isCritical,
    isError,
    setError,
    deleteError
  }
})

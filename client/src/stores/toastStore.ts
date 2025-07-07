import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const message = ref('')
  const type = ref<'success' | 'error' | 'warning' | ''>('')
  const visible = ref(false)

  function showToast(msg: string, msgType: 'success' | 'error' | 'warning' = 'success') {
    message.value = msg
    type.value = msgType
    visible.value = true

    setTimeout(() => {
      visible.value = false
    }, 3000)
  }

  return { message, type, visible, showToast }
})

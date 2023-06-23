import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingStore = defineStore('setting', () => {
    const coloringEdgeSeats = ref(false)

    return { coloringEdgeSeats }
  },
  {
    persist: true
  })

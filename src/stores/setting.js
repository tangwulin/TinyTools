import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingStore = defineStore('setting', () => {
    const coloringEdgeSeats = ref(false)
    const bgms = ref([])
    const isBGMInitialized = ref(false)
    return { coloringEdgeSeats, bgms, isBGMInitialized }
  },
  {
    persist: true
  })

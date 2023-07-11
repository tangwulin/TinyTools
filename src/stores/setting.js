import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingStore = defineStore('setting', () => {
    const coloringEdgeSeats = ref(false)
    const bgms = ref([])
    const isBGMInitialized = ref(false)

    const imageFormat = ref('png')
    const pngScale = ref(2)
    return { coloringEdgeSeats, bgms, isBGMInitialized, imageFormat,pngScale }
  },
  {
    persist: true
  })

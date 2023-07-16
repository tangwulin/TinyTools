import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingStore = defineStore('setting', () => {
    const coloringEdgeSeats = ref(false)
    const bgms = ref([])
    const finalBgms = ref([])
    const isBGMInitialized = ref(false)

    const scale = ref(2)
    const enableQuickSave = ref(false)
    return { coloringEdgeSeats, bgms,finalBgms, isBGMInitialized, scale, enableQuickSave }
  },
  {
    persist: true
  })

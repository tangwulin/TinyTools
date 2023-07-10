import { computed, ref } from 'vue'
import { defineStore } from "pinia";
import {parseEdgeSeatIndex} from '@/assets/script/seatHelper'

export const useSeatStore = defineStore('seat', () => {
        const allSeats = ref([])
        const edgeSeatsIndex = computed(()=>parseEdgeSeatIndex(allSeats.value.length))
        const oldRenderingList =ref([])
        return { allSeats, edgeSeatsIndex, oldRenderingList }
    },
    {
        persist: true,
    })
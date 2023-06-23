import { computed, ref } from 'vue'
import { defineStore } from "pinia";
import {parseEdgeSeatIndex} from '@/assets/seatHelper'

export const useSeatStore = defineStore('seat', () => {
        const allSeats = ref([])
        const edgeSeatsIndex = computed(()=>parseEdgeSeatIndex(allSeats.value.length))
        return { allSeats, edgeSeatsIndex }
    },
    {
        persist: true,
    })
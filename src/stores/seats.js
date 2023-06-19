import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useSeatStore = defineStore('seat', () => {
        const allSeats = ref([])
        const edgeSeatsIndex = ref([])
        const whoInEdgeSeats = computed(edgeSeatsIndex.value.map(index => allSeats.value[index]))

        /*function increment()
        {
            count.value++
        }*/

        return { allSeats, edgeSeatsIndex,whoInEdgeSeats }
    },
    {
        persist: true,
    })
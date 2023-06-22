<script setup>
import { NButton } from 'naive-ui'
import draggable from 'vuedraggable-swap'
import { computed, ref, watch } from 'vue'
import { getRenderingList, parseRenderingListToSeats } from '@/assets/seatHelper'

const props = defineProps(['seats', 'coloringEdge'])
const emit = defineEmits(['update', 'update:seats'])

let onPropChanging = false
let onRenderingChanging = false

const _seats = ref(props.seats)
const seats = computed({
  get()
  {
    return _seats.value
  },
  set(value)
  {
    console.log('seats changed')
    _seats.value = value
    onPropChanging = true
    if (onRenderingChanging)
    {
      onRenderingChanging = false
    }
    else
    {
      renderingList.value = getRenderingList(seats.value)
    }
    emit('update:seats', value)
  }
})

const _renderingList = ref(getRenderingList(seats.value))
const renderingList = computed({
  get()
  {
    return _renderingList.value
  },
  set(value)
  {
    console.log('renderingList changed')
    _renderingList.value = value
    if (onPropChanging)
    {
      onPropChanging = false
    }
    else
    {
      onRenderingChanging = true
      seats.value = parseRenderingListToSeats(value)
    }

  }
})

watch(() => props.seats, () => {
  console.log('props changed')
  seats.value = props.seats
})
</script>

<template>
  <div>
    <div class="flex items-center justify-center h-1/2">
      <draggable v-model="renderingList" filter=".should-not-be-dragged" :swap="true" animation="50"
                 class="text-center w-2/3 h-1/2 grid grid-cols-11" item-key="id">
        <!--suppress VueUnrecognizedSlot -->
        <template #item="{ element }">
          <NButton v-if="element.isSeat" :color="element.color" size="large">{{ element.name }}</NButton>
          <div v-else-if="!element.isDashed" class="should-not-be-dragged"></div>
          <NButton v-else size="large"  dashed class="should-not-be-dragged"></NButton>
        </template>
      </draggable>
    </div>
  </div>
</template>

<!--suppress CssUnresolvedCustomProperty -->
<style scoped>
button, [type='button'], [type='reset'], [type='submit'] {
  -webkit-appearance: button;
  background-color: var(--n-color);
  background-image: none;
}
</style>
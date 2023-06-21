<script setup>
import { NButton } from "naive-ui";
import draggable from "vuedraggable-swap";
import { computed, ref, watch } from "vue";

const props = defineProps(['seats']);
const emit = defineEmits(['update','update:seats']);

//const seats = ref(props.seats);
const seats =computed({
  get(){
    return props.seats
  },
  set(value){
    emit('update:seats',value)
  }
})


const getRenderingList = (x) => {
  let result = [];
  if (x.length === 0) return result;
  result = x.map(item => {
    return { name: item.name, isSeat: true, index: item.index };
  }).flatMap((value, index) => {
    if ((index + 1) % 2 === 0 && (index + 1) % 8 !== 0)
    {
      return [value, { name: null, isSeat: false }];
    } else
    {
      return value;
    }
  });

  let remaining = 11 - Math.ceil(result.length % 11);

  if (remaining % 3 !== 0)
  {
    for (let i = 0; i < Math.ceil(remaining % 3); i++)
    {
      result.push({ name: null, isSeat: false, isDashed: true });
    }
  }

  for (let i = 0; i < (remaining - remaining % 3) / 3; i++)
  {
    result.push(
        { name: null, isSeat: false },
        { name: null, isSeat: false, isDashed: true },
        { name: null, isSeat: false, isDashed: true });
  }

  return result;
};


const parseRenderingListToSeats = (x) => {
  return x.map(item => {
    if (item.isSeat !== false)
    {
      return { name: item.name, index: item.index };
    }
  }).filter(item => item !== undefined);
};

const renderingList = ref(getRenderingList(seats.value));

watch(renderingList, async () => {
  seats.value = parseRenderingListToSeats(renderingList.value);
  emit('update')
});


</script>

<template>
  <div>
    <div class="flex items-center justify-center h-1/2">
      <draggable v-model="renderingList" filter=".should-not-be-dragged" :swap="true" animation="150"
                 class="text-center w-2/3 h-1/2 grid grid-cols-11" item-key="id">
        <!--suppress VueUnrecognizedSlot -->
        <template #item="{ element }">
          <NButton v-if="element.isSeat" :color="element.color" size="large">{{ element.name }}</NButton>
          <div v-else-if="!element.isDashed" class="should-not-be-dragged"></div>
          <NButton v-else size="large" dashed class="should-not-be-dragged"></NButton>
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
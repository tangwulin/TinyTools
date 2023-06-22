<script setup>
import { NButton } from "naive-ui";
import draggable from "vuedraggable-swap";
import { computed, ref, watch } from "vue";

const props = defineProps(['seats']);
const emit = defineEmits(['update', 'update:seats']);

const seatsUpdating=ref(false)
const seats = computed({
  get()
  {
    return props.seats;
  },
  set(value)
  {
    emit('update:seats', value);
  }
});

const getRenderingList = (x) => {
  let stopwatch = performance.now();
  if (x.length === 0) return [];

  const result = x.map(item => ({
    name: item.name,
    isSeat: true,
    index: item.index,
    color: item.color
  })).flatMap((value, index) => {
    if ((index + 1) % 2 === 0 && (index + 1) % 8 !== 0)
    {
      return [value, { name: null, isSeat: false }];
    } else
    {
      return value;
    }
  });
  console.log('convert time:' + (performance.now() - stopwatch));
  stopwatch = performance.now();
  const remaining = 11 - (result.length % 11);

  if (remaining % 3 !== 0)
  {
    for (let i = 0; i < remaining % 3; i++)
    {
      result.push({ name: null, isSeat: false, isDashed: true });
    }
  }

  for (let i = 0; i < (remaining - remaining % 3) / 3; i++)
  {
    result.push(
        { name: null, isSeat: false },
        { name: null, isSeat: false, isDashed: true },
        { name: null, isSeat: false, isDashed: true }
    );
  }
  console.log('add blank time:' + (performance.now() - stopwatch));
  return result;
};


const parseRenderingListToSeats = (x) => {
  return x.map(item => {
    if (item.isSeat !== false)
    {
      return { name: item.name, index: item.index, color: item.color };
    }
  }).filter(item => item !== undefined);
};

const renderingListRef = ref(getRenderingList(seats.value));
const renderingList = computed({
  get()
  {
    return renderingListRef.value;
  },
  set(value)
  {
    renderingListRef.value = value;
    seatsUpdating.value=true
    seats.value = parseRenderingListToSeats(renderingListRef.value);
    console.log('renderingList updated');
    emit('update');
  }
});

watch(seats, () => {
  if (seatsUpdating.value===true) return
  renderingList.value = getRenderingList(seats.value);
});

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
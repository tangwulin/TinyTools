<!-- 这是由chatgpt写的，我只是缝缝补补让它勉强能用（它并没有实现我想要的拖拽互换位置），感觉不如返璞归真的手搓 -->

<template>
    <div class="seat-table">
        <div>111</div>
        <draggable v-model="seats" :options="dragOptions" :item-key="seat => seat.id" @end="handleDragEnd">
            <template #item="{ element }">
                <n-card :style="{ opacity: element.disabled ? '0.5' : '1' }">
                    {{ element.name }}
                </n-card>
            </template>
        </draggable>
    </div>
</template>
<script setup>
import { ref, defineProps } from "vue";
import { NCard } from "naive-ui";
import draggable from "vuedraggable";

const props = defineProps({
  seats: {
    type: Array,
    required: true,
  },
  draggable: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['update'])
const seats = ref(props.seats);
const dragOptions = {
  disabled: props.draggable, // 别问为啥是这样，我也不知道
};

function handleDragEnd() {
  emit("update", seats.value);
}
</script>
  
<style>
.seat-table {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}
</style>
  
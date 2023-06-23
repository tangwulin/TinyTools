<template>
  <div>
    <h2>可拖动列表</h2>
    <draggable v-model="items" :options="dragOptions">
      <!--      <div v-for="(item, index) in items" :key="index" class="draggable-item">
              {{ item }}
            </div>-->
      <template v-slot:item="{element}">
        <div class="draggable-item" :key="element">{{ element }}</div>
      </template>
    </draggable>
    <VueDraggable v-model="items" :options="dragOptions">
      <div v-for="(item, index) in items" :key="index" class="draggable-item">
        {{ item }}
      </div>
    </VueDraggable>
  </div>
</template>

<script>
import draggable from "vuedraggable-swap";
import {VueDraggable} from 'vue-draggable-plus'

export default {
  components: {
    draggable,
    VueDraggable
  },
  data() {
    return {
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
      dragOptions: {
        draggable: '.draggable-item', // 可拖动的元素的 CSS 选择器
      },
    };
  },
};
</script>

<style>
.draggable-item {
  background-color: #f2f2f2;
  padding: 10px;
  margin-bottom: 5px;
}
</style>

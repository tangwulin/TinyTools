<template>
  <draggable
      :list="list"
      :disabled="!enabled"
      class="list-group"
      ghost-class="ghost"
      :move="checkMove"
      @end="end"
      @sort="sort"
      @update="update"
      @start="start"
  >
    <template #item="{element}">
      <div class="list-group-item" :key="element.name">{{element.name}}</div>
    </template>
<!--    <div class="list-group-item" v-for="element in list" :key="element.name">{{ element.name }}</div>-->
  </draggable>
  <VueDraggable
      :list="list"
      :disabled="!enabled"
      class="list-group"
      ghost-class="ghost"
      :move="checkMove"
      @end="end"
      @sort="sort"
      @update="update"
      @start="start"
  >
    <div class="list-group-item" v-for="(item,index) in list" :key="index">{{item.name}}</div>
  </VueDraggable>
</template>
<script>
import draggable from "vuedraggable-swap";
import {VueDraggable} from "vue-draggable-plus";
//import {it} from "date-fns/locale";
let id = 1;
export default {
  name: 'simple',
  display: "Simple",
  order: 0,
  components: {
    draggable,
    VueDraggable
  },
  data() {
    return {
      enabled: true,
      list: [{ name: "a" }, { name: "b" }, { name: "c" }, { name: "d" }, { name: "e" }],
      dragging: false,
      index: 0,
      copyList: [],
    };
  },
  computed: {
    it() {
      return it
    },
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    },
  },
  created() {
    this.copyList = this.list.slice(0);
  },
  methods: {
    add: function () {
      this.list.push({ name: "Juan " + id, id: id++ });
    },
    replace: function () {
      this.list = [{ name: "Edgard", id: id++ }];
    },
    end({ oldIndex, newIndex }) {
      const item = this.copyList[oldIndex];
      this.copyList.splice(oldIndex, 1, this.copyList[newIndex]);
      this.copyList.splice(newIndex, 1, item);
      this.list = this.copyList;
      this.copyList = this.list.slice(0);
    },
  }
};

</script>
<!--<script setup>
import { draggable } from "vuedraggable";
let id = 1;
const name = 'simple';
const display = "Simple";
const order = 0;
const enabled = true;
let list = [{ name: "a" }, { name: "b" }, { name: "c" }, { name: "d" }, { name: "e" }];
let dragging = false;
let index = 0;
let copyList = list.slice(0);

function add() {
  list.push({ name: "Juan " + id, id: id++ });
}

function replace() {
  list = [{ name: "Edgard", id: id++ }];
}

function end({ oldIndex, newIndex }) {
  const item = copyList[oldIndex];
  copyList.splice(oldIndex, 1, copyList[newIndex]);
  copyList.splice(newIndex, 1, item);
  list = copyList;
  copyList = list.slice(0);
}

const draggingInfo = dragging ? "under drag" : "";
</script>-->

<template>
  <SeatTable v-model:seats="seats" @update="console.log(seats)"></SeatTable>
</template>
<script setup>
import SeatTable from "@/components/SeatTable.vue";
import { ref } from "vue";

const seats = ref([
  {
    "name": "孙菊",
    "isSeat": true,
    "index": 0
  },
  {
    "name": "邓飞",
    "isSeat": true,
    "index": 1
  },
  {
    "name": "阮小二",
    "isSeat": true,
    "index": 2
  },
  {
    "name": "孙新",
    "isSeat": true,
    "index": 3
  },
  {
    "name": "张青",
    "isSeat": true,
    "index": 4
  },
  {
    "name": "卢俊义",
    "isSeat": true,
    "index": 5
  },
  {
    "name": "柴进",
    "isSeat": true,
    "index": 6
  },
  {
    "name": "张清",
    "isSeat": true,
    "index": 7
  },
  {
    "name": "邓柳",
    "isSeat": true,
    "index": 8
  },
  {
    "name": "曹正",
    "isSeat": true,
    "index": 9
  },
  {
    "name": "史进",
    "isSeat": true,
    "index": 10
  },
  {
    "name": "秦明",
    "isSeat": true,
    "index": 11
  },
  {
    "name": "张潮",
    "isSeat": true,
    "index": 12
  },
  {
    "name": "花荣",
    "isSeat": true,
    "index": 13
  },
  {
    "name": "宋江",
    "isSeat": true,
    "index": 14
  },
  {
    "name": "孙立",
    "isSeat": true,
    "index": 15
  },
  {
    "name": "刘唐",
    "isSeat": true,
    "index": 16
  },
  {
    "name": "阮小五",
    "isSeat": true,
    "index": 17
  },
  {
    "name": "武大郎",
    "isSeat": true,
    "index": 18
  },
  {
    "name": "张顺",
    "isSeat": true,
    "index": 19
  },
  {
    "name": "董平",
    "isSeat": true,
    "index": 20
  },
  {
    "name": "燕青",
    "isSeat": true,
    "index": 21
  },
  {
    "name": "邓茂",
    "isSeat": true,
    "index": 22
  },
  {
    "name": "李忠",
    "isSeat": true,
    "index": 23
  },
  {
    "name": "吴用",
    "isSeat": true,
    "index": 24
  },
  {
    "name": "张横",
    "isSeat": true,
    "index": 25
  },
  {
    "name": "萧让",
    "isSeat": true,
    "index": 26
  },
  {
    "name": "李逵",
    "isSeat": true,
    "index": 27
  },
  {
    "name": "万二郎",
    "isSeat": true,
    "index": 28
  },
  {
    "name": "解珍",
    "isSeat": true,
    "index": 29
  },
  {
    "name": "关胜",
    "isSeat": true,
    "index": 30
  },
  {
    "name": "武松",
    "isSeat": true,
    "index": 31
  },
  {
    "name": "公孙胜",
    "isSeat": true,
    "index": 32
  },
  {
    "name": "孙二娘",
    "isSeat": true,
    "index": 33
  },
  {
    "name": "宋清",
    "isSeat": true,
    "index": 34
  },
  {
    "name": "李天所",
    "isSeat": true,
    "index": 35
  },
  {
    "name": "林冲",
    "isSeat": true,
    "index": 36
  },
  {
    "name": "呼延灼",
    "isSeat": true,
    "index": 37
  },
  {
    "name": "鲁智深",
    "isSeat": true,
    "index": 38
  },
  {
    "name": "卢健",
    "isSeat": true,
    "index": 39
  },
  {
    "name": "李应",
    "isSeat": true,
    "index": 40
  },
  {
    "name": "朱仝",
    "isSeat": true,
    "index": 41
  },
  {
    "name": "满宝",
    "isSeat": true,
    "index": 42
  },
  {
    "name": "傅化",
    "isSeat": true,
    "index": 43
  },
  {
    "name": "解宝",
    "isSeat": true,
    "index": 44
  },
  {
    "name": "颜良",
    "isSeat": true,
    "index": 45
  },
  {
    "name": "秦明",
    "isSeat": true,
    "index": 46
  },
  {
    "name": "时迁",
    "isSeat": true,
    "index": 47
  },
  {
    "name": "宋江",
    "isSeat": true,
    "index": 48
  },
  {
    "name": "杨志",
    "isSeat": true,
    "index": 49
  },
  {
    "name": "刘山",
    "isSeat": true,
    "index": 50
  },
  {
    "name": "穆弘",
    "isSeat": true,
    "index": 51
  },
  {
    "name": "黄信",
    "isSeat": true,
    "index": 52
  },
  {
    "name": "赵敬",
    "isSeat": true,
    "index": 53
  },
  {
    "name": "朱武",
    "isSeat": true,
    "index": 54
  }
]);
</script>
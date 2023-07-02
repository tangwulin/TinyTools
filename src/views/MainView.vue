<template>
  <div class="flex items-center justify-center flex-col w-max h-auto m-auto">
    <div id="target-div" class="m-auto md:w-fit ">
      <div class="flex items-center justify-center mb-4">
        <n-button :size='"large"'>讲台</n-button>
      </div>
      <div>
        <SeatTable v-model:seats="allSeats" v-model:rendering-list="oldRenderingList" :key="stKey"
                   :coloring-edge="coloringEdgeSeats"/>
      </div>
      <div class="flex justify-center mt-4">
        <p>{{ currentDate }}--{{ currentTime }}</p>
      </div>
    </div>
    <div class="flex items-center justify-center mt-8 flex-col">
      <div class="flex items-center justify-center flex-col md:flex-row">
        <n-tooltip trigger="hover">
          <!--suppress VueUnrecognizedSlot -->
          <template #trigger>
            <n-switch v-model:value="coloringEdgeSeats" @update:value="repaint"/>
          </template>
          边缘位置高亮
        </n-tooltip>
        <n-button @click="reloadSeatTable">重载座位表组件</n-button>
        <n-button @click="reSort" :loading="loading">
          <template #icon>
            <n-icon>
              <Refresh/>
            </n-icon>
          </template>
          随机排列座位
        </n-button>
        <n-button @click="replaceSeats" :loading="loading">
          <template #icon>
            <n-icon>
              <RefreshDot/>
            </n-icon>
          </template>
          重新排列座位
        </n-button>
        <n-tooltip trigger="hover">
          <!--suppress VueUnrecognizedSlot -->
          <template #trigger>
            <n-button @click="rollSeats" :loading="loading">
              <template #icon>
                <n-icon>
                  <RefreshDot/>
                </n-icon>
              </template>
              按规则Roll座位
            </n-button>
          </template>
          随机5次再将原始位置按“重新排列座位”的做法排列（虚 晃 一 枪）
        </n-tooltip>
        <n-button @click="save">保存</n-button>
      </div>
      <div>
        <n-button-group>
          <n-button @click="showSetting=true">设置</n-button>
          <n-button @click="showManager">人员管理</n-button>
          <n-button @click="showMultiAddModal">增加人员</n-button>
        </n-button-group>
      </div>
    </div>


    <n-modal v-model:show="showSetting" style="width: 60%">
      <n-card
          style="width: 60%"
          title="设置"
          :bordered="true"
          size="small"
          closable
          @close="showSetting=false"
      >
        <div class="flex flex-row justify-items-start" style="height: 60vh">
          <div class="px-2 pt-2 mr-2 bg-gray-200 rounded">
            <n-list class="flex flex-col justify-center w-1/4 min-w-0">
              <n-list-item v-for="item in settings" :key="item.name" class="bg-gray-200">
                <n-button text tag="a" @click="handleSetting(item)">{{ item.name }}</n-button>
              </n-list-item>
            </n-list>
          </div>

          <n-layout :key="scKey">
            <n-layout-header>{{ currentSetting.name }}</n-layout-header>
            <n-layout-content>
              <component :is="currentSetting.component" :showAddModal="showAddModal"/>
            </n-layout-content>
          </n-layout>
        </div>
      </n-card>
    </n-modal>
    <div class="fixed bottom-0 right-0 mb-2 mr-2 ">
      <audio controls id="player" src="https://music.163.com/song/media/outer/url?id=430620198.mp3"></audio>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  NButton,
  NButtonGroup,
  NCard,
  NIcon,
  NModal,
  NSwitch,
  NTooltip,
  NLayout,
  NLayoutContent,
  useMessage
} from 'naive-ui'
import { Refresh, RefreshDot } from '@vicons/tabler'
import SeatTable from '@/components/SeatTable.vue'
import BgmSetting from '@/components/BgmSetting.vue'
import PersonManage from '@/components/PersonManage.vue'
import { useSeatStore } from '@/stores/seat'
import { usePersonStore } from '@/stores/person'
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'
import { replaceArrayElements, shuffleArray } from '@/assets/seatHelper'

const message = useMessage()

const seatStore = useSeatStore()
const personStore = usePersonStore()
const settingStore = useSettingStore()

const { allSeats, oldRenderingList } = storeToRefs(seatStore)
const { allPerson } = storeToRefs(personStore)
const { coloringEdgeSeats } = storeToRefs(settingStore)

const showSetting = ref(false)
const showAddModal=ref(false)
const currentDate = ref('')
const currentTime = ref('')
const loading = ref(false)
const stKey = ref(Math.random())
const scKey = ref(Math.random())

let currentSetting = { name: '🎶背景音乐', component: BgmSetting }
const settings = [{ name: '🎶背景音乐', component: BgmSetting }, { name: '💁人员管理', component: PersonManage }]
const showManager = () => {
  currentSetting = { name: '💁人员管理', component: PersonManage }
  showSetting.value=true
}
const showMultiAddModal = () => {
  currentSetting = { name: '💁人员管理', component: PersonManage }
  showSetting.value=true
  showAddModal.value=true
}
const handleSetting = (x) => {
  currentSetting = x
  scKey.value = Math.random()
}
// 在组件挂载时开始更新日期和时间
onMounted(() => {
  updateDateTime()
  setInterval(updateDateTime, 1000)
})

// 在组件卸载时停止更新日期和时间
onUnmounted(() => {
  clearInterval(updateDateTime)
})

// 更新日期和时间
function updateDateTime()
{
  const now = new Date()
  const date = now.toLocaleDateString()
  const time = now.toLocaleTimeString()
  currentDate.value = date
  currentTime.value = time
}

//const worker = new Worker('src/assets/seatWorker.js', { type: 'module' })
const save = async () => {
  async function loadModule()
  {
    return await import('html2canvas')
  }

  const div = document.getElementById('target-div')
  const canvas = document.createElement('canvas')
  const w = div.offsetWidth
  const h = div.offsetHeight
  canvas.width = w * 2
  canvas.height = h * 2
  canvas.style.width = w + 'px'
  canvas.style.height = h + 'px'
  const context = canvas.getContext('2d')
  context.scale(2, 2)
  const html2canvas = await loadModule()

  html2canvas.default(div, { canvas: canvas })
             .then(canvas => {
               // 将 Canvas 转换为图像数据 URL
               const imageDataUrl = canvas.toDataURL()
               //console.log(imageDataUrl)
               // 创建一个 <a> 元素
               const link = document.createElement('a')
               link.href = imageDataUrl

               // 设置下载属性
               link.download = 'seat-' + currentDate.value + '-' + currentTime.value + '.png'

               // 模拟点击下载链接
               link.click()
             })
             .catch(error => {
               // 处理截图错误
               console.error(error)
             })
}

if ((allPerson.value.length !== 0 && allSeats.value.length === 0) || allPerson.value.length !== allSeats.value.length)
{
  allSeats.value = allPerson.value.map((name, index) => {
    return { name: name, index: index }
  })
  console.log('seat has been initialized')
}

const reSort = async () => {
  loading.value = true
  await nextTick()
  allSeats.value = shuffleArray(allSeats.value)
  await nextTick()
  setTimeout(() => {loading.value = false}, 50)
}

const rollSeats = async () => {
  loading.value = true
  await nextTick()
  const originSeats = [...allSeats.value]
  /*const timer = setTimeout( () => {
    allSeats.value = shuffleArray(allSeats.value)
    await nextTick()
    console.log(1)
  }, 500)*/
  let count = 0 // 计数器

  const intervalId = setInterval(async () => {
    // 执行某个操作
    allSeats.value = shuffleArray(allSeats.value)
    await nextTick()

    count++ // 增加计数器

    if (count === 6)
    {
      clearInterval(intervalId) // 达到执行次数后清除定时器
      setTimeout(() => {loading.value = false}, 500)
      allSeats.value = replaceArrayElements(originSeats).map((item, index) => {
        return {
          name: item.name,
          index: index
        }
      })
    }
  }, 500)
}

const replaceSeats = async () => {
  //TODO:把这部分移到WebWorker
  /*const data =[...allSeats.value]
  console.log('主线程向worker发送消息：'+data)
  worker.postMessage(data)*/
  loading.value = true
  console.log('开始重新排列座位')
  const stopwatch = performance.now()
  await nextTick()
  allSeats.value = replaceArrayElements(allSeats.value).map((item, index) => {return { name: item.name, index: index }})
  await nextTick()
  console.log('执行完成,用时' + (performance.now() - stopwatch) + 'ms')
  setTimeout(() => {loading.value = false}, 50)
}

const reloadSeatTable = async () => {
  stKey.value = Math.random() //刷新一下SeatTable组件
  allSeats.value = [...allSeats.value] //这里不是脱裤子放屁，是为了触发侦听器
  console.log('SeatTable has been reload')
}

const repaint = async (x) => {
  if (!x) allSeats.value.forEach(item => item.color = null)
  await reloadSeatTable()
}

watch(allPerson, reloadSeatTable)
watch(allSeats, () => {
  console.log('seat changed')
})
watch(oldRenderingList, () => {
  stKey.value = Math.random()
})

/*worker.onmessage = function (event) {
  console.log('接收到Web Worker的消息:', event.data)
  //allSeats.value=event.data
}*/

</script>

<style scoped>

</style>

<template>
  <div>
    <div id="target-div" class="m-auto w-2/3 ">
      <div class="flex items-center justify-center mb-4">
        <n-button :size='"large"'>讲台</n-button>
      </div>
      <div>
        <SeatTable v-model:seats="allSeats" v-model:rendering-list="oldRenderingList" :key="stKey"
                   :coloring-edge="coloringEdgeSeats"/>
      </div>
      <div class="flex justify-center">
        <p>{{ currentDate }}--{{ currentTime }}</p>
      </div>
    </div>
    <div class="flex items-center justify-center mt-16 flex-col">
      <div>
        <NButtonGroup>
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
        </NButtonGroup>
      </div>
      <div>
        <n-button-group>
          <n-button @click="showManager=true">人员管理</n-button>
          <n-button @click="showAddModal=true">增加人员</n-button>
        </n-button-group>
      </div>
    </div>

    <n-modal v-model:show="showManager">
      <n-card
          style="width: 50%"
          title="人员管理"
          :bordered="true"
          size="huge"
          closable
          @close="showManager=false"
      >
        <n-dynamic-tags v-model:value="allPerson" @update:value="message.success('修改成功')"/>
      </n-card>
    </n-modal>
    <n-modal v-model:show="showAddModal">
      <n-card
          style="width: 50%"
          title="批量增加人员"
          :bordered="true"
          size="huge"
          closable
          @close="showAddModal=false"
      >
        <n-form
            :label-width="80"
            :model="formValue"
        >
          <n-form-item label="请在下方输入姓名，多个请以空格或英文逗号分割" path="input">
            <n-text>当前已检测到：{{ formValue.names.length }}个</n-text>
            <n-input v-model:value="formValue.input" type="textarea" placeholder="张三,李四,王五……"
                     @blur="parseName" @focus="parseName" @keyup="parseName"/>
          </n-form-item>
          <n-form-item label="解析到的姓名" path="names">
            <n-dynamic-tags v-model:value="formValue.names"/>
          </n-form-item>
        </n-form>
        <template #footer>
          <div class="flex">
            <NButton class="ml-auto" type="primary" @click="addPerson" :disabled="formValue.names.length===0">
              保存
            </NButton>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  NButton,
  NButtonGroup,
  NCard,
  NDynamicTags,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  NModal,
  NSwitch,
  NTooltip,
  useMessage
} from 'naive-ui'
//import { RefreshRound as RefreshIcon } from '@vicons/material'
import { Refresh, RefreshDot } from '@vicons/tabler'
import SeatTable from '@/components/SeatTable.vue'
import { useSeatStore } from '@/stores/seat'
import { usePersonStore } from '@/stores/person'
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'
//import html2canvas from 'html2canvas'
//const importHtml2canvas = () => import('html2canvas')
import { replaceArrayElements, shuffleArray } from '@/assets/seatHelper'

const message = useMessage()

const seatStore = useSeatStore()
const personStore = usePersonStore()
const settingStore = useSettingStore()

const { allSeats, oldRenderingList } = storeToRefs(seatStore)
const { allPerson } = storeToRefs(personStore)
const { coloringEdgeSeats } = storeToRefs(settingStore)

const formValue = ref({ input: '', names: [] })
const showAddModal = ref(false)
const showManager = ref(false)
const currentDate = ref('')
const currentTime = ref('')
const loading = ref(false)
const stKey = ref(Math.random())

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
  /*// 获取要截图的 <div> 元素
  const targetDiv = document.getElementById('target-div')

// 使用 html2canvas 对 <div> 进行截图
  html2canvas(targetDiv)
      .then(canvas => {
        // 将 Canvas 转换为图像数据 URL
        const imageDataUrl = canvas.toDataURL()
        console.log(imageDataUrl)
        // 创建一个 <a> 元素
        const link = document.createElement('a')
        link.href = imageDataUrl

        // 设置下载属性
        link.download = 'screenshot.png'

        // 模拟点击下载链接
        link.click()
      })
      .catch(error => {
        // 处理截图错误
        console.error(error)
      })*/
}

if ((allPerson.value.length !== 0 && allSeats.value.length === 0) || allPerson.value.length !== allSeats.value.length)
{
  allSeats.value = allPerson.value.map((name, index) => {
    return { name: name, index: index }
  })
  console.log('seat has been initialized')
}
const parseName = () => {
  formValue.value.names =
      formValue.value.input
               .split(/[,\s]+/)
               .filter((element) => element !== undefined && element !== null && element !== '')
}

const addPerson = () => {
  console.log('添加了这' + formValue.value.names.length + '个人：' + formValue.value.names)
  allPerson.value.push(...formValue.value.names)
  message.success('添加成功，共添加了' + formValue.value.names.length + '个')
  showAddModal.value = false
  //console.log(allSeats)
  formValue.value.names
           .map((name, index) => {
             return { name: name, index: index }
           })
           .forEach(item => allSeats.value.push(item))
  formValue.value.names = []
  reloadSeatTable()
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
  let count = 0; // 计数器

  const intervalId = setInterval(async () => {
    // 执行某个操作
    allSeats.value = shuffleArray(allSeats.value)
    await nextTick()

    count++; // 增加计数器

    if (count === 6)
    {
      clearInterval(intervalId); // 达到执行次数后清除定时器
      setTimeout(() => {loading.value = false}, 500)
      allSeats.value = replaceArrayElements(originSeats).map((item, index) => {return { name: item.name, index: index }})
    }
  }, 500);
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

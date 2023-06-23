<template>
  <div>
    <div>
      <SeatTable v-model:seats="allSeats" :key="stKey" :coloring-edge="coloringEdgeSeats"/>
    </div>
    <div class="flex items-center justify-center mt-16 flex-col">
      <div>
        <NButtonGroup>
          <n-switch v-model:value="coloringEdgeSeats" @update:value="repaint"/>
          <n-button @click="updateSeats">重新着色</n-button>
          <NButton @click="reSort">随机排列座位</NButton>
          <n-button>重新排列座位</n-button>
          <NButton>保存</NButton>
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
import { ref, watch } from 'vue'
import { NButton, NModal, NCard, NForm, NFormItem, NInput, NDynamicTags, NSwitch, useMessage } from 'naive-ui'
import SeatTable from '@/components/SeatTable.vue'
import { useSeatStore } from '@/stores/seat'
import { usePersonStore } from '@/stores/person'
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'

const message = useMessage()

const seatStore = useSeatStore()
const personStore = usePersonStore()
const settingStore = useSettingStore()

const { allSeats, edgeSeatsIndex } = storeToRefs(seatStore)
const { allPerson } = storeToRefs(personStore)
const { coloringEdgeSeats } = storeToRefs(settingStore)

//const colorEdge = ref(false)

const showAddModal = ref(false)
const showManager = ref(false)
const formValue = ref({ input: '', names: [] })
const stKey = ref(Math.random())

const parseName = () => {
  formValue.value.names =
      formValue.value.input
               .split(/[,\s]+/)
               .filter((element) => element !== undefined && element !== null && element !== '')
}

const addPerson = () => {
  allPerson.value.push(...formValue.value.names)
  message.success('添加成功，共添加了' + formValue.value.names.length + '个')
  showAddModal.value = false
  formValue.value.names = []
  allSeats.value.push(
      allPerson.value.map((name, index) => {
        return { name: name, index: index }
      })
  )
  updateSeats()
}

const reSort = () => {
  allSeats.value = shuffleArray(allSeats.value)
}

function shuffleArray(array)
{
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--)
  {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray.map((item, index) => {
    return { name: item.name, index: index }
  })
}

const updateSeats = async () => {
  stKey.value = Math.random() //刷新一下SeatTable组件
  allSeats.value = [...allSeats.value] //这里不是脱裤子放屁，是为了触发侦听器
}

const repaint = (x) => {
  let repaintColor = null
  if (x) repaintColor = '#114514'
  allSeats.value.forEach((x, index) => {
    if (edgeSeatsIndex.value.find(y => y === index) || index === 0)
    {
      x.color = repaintColor
    }
    else
    {

      x.color = null
    }
  })
  updateSeats()
}

watch(allPerson, updateSeats)
watch(allSeats, () => {
  console.log('seat changed')
})

</script>

<style scoped>

</style>

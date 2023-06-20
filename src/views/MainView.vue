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

    <div class="flex items-center justify-center mt-16">
      <NButtonGroup>
        <NButton @click="reSort">随机排列座位</NButton>
        <n-button>重新排列座位</n-button>
        <NButton>保存</NButton>
      </NButtonGroup>
      <n-button-group>
        <n-button @click="showAddMultiModal=true">增加人员</n-button>
      </n-button-group>
    </div>

    <n-modal v-model:show="showAddMultiModal">
      <n-card
          style="width: 50%"
          title="批量增加人员"
          :bordered="true"
          size="huge"
          role="dialog"
          aria-modal="true"
          @close="formMultiValue.names=[]"
      >
        <n-form
            :label-width="80"
            :model="formMultiValue"
        >
          <n-form-item label="请在下方输入姓名，多个请以空格或英文逗号分割" path="input">
            <n-input v-model:value="formMultiValue.input" type="textarea" placeholder="这里可以输入多个"
                     @blur="parseName" @focus="parseName" @keyup="parseName"/>
          </n-form-item>
          <n-form-item label="解析到的姓名" path="names">
            <n-dynamic-tags v-model:value="formMultiValue.names"/>
          </n-form-item>
        </n-form>
        <template #footer>
          <div class="flex">
            <NButton class="ml-auto" type="primary" @click="addPerson" :disabled="formMultiValue.names.length===0">
              保存
            </NButton>
          </div>
        </template>
      </n-card>

    </n-modal>
  </div>
</template>

<script setup>
import { NButton, NModal, NCard, NForm, NFormItem, NInput, NDynamicTags, useMessage } from 'naive-ui';
import draggable from "vuedraggable-swap";
import { useSeatStore } from "@/stores/seats";
import { usePersonStore } from "@/stores/person";
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";

const message = useMessage();
const showAddMultiModal = ref(false);

const formMultiValue = ref({ input: '', names: [] });

const parseName = () => {
  formMultiValue.value.names =
      formMultiValue.value.input
          .split(/[,\s]+/)
          .filter((element) => element !== undefined && element !== null && element !== "");
};

const getRenderingList = (x) => {
  let result = [];
  if (x.value.length === 0) return result;
  result = x.value.map((name, index) => {
    return { name: name, isSeat: true, index: index };
  }).flatMap((value, index) => {
    if ((index + 1) % 2 === 0 && (index + 1) % 8 !== 0)
    {
      return [value, { name: null, isSeat: false }];
    } else
    {
      return value;
    }
  });
  //console.log('result.length:'+result.length)
  let remaining = 11 - Math.ceil(result.length % 11);
  //console.log('remaining:'+remaining);
  //console.log(Math.ceil(remaining % 3))
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

const seatStore = useSeatStore();
const personStore = usePersonStore();
const { allSeats, whoInEdgeSeats, edgeSeatsIndex } = storeToRefs(seatStore);
const { allPerson } = storeToRefs(personStore);

const parseEdgeSeatIndex = (x) => {
  const l = x.value.length;
  if (l === 0) return [];
  let result = [];
  for (let i = 0; i < (l / 8); i++)
  {
    result.push({ index: i }, { index: i + 8 });
  }
  if (l % 8 !== 0) result.push({ index: Math.floor(l / 8) + 1 });
  return result;
};
const addPerson = () => {
  //if(formMultiValue.value.names.length===0) message.warning("至少添加一个")
  allPerson.value.push(...formMultiValue.value.names);
  message.success("添加成功，共添加了" + formMultiValue.value.names.length + "个");
  showAddMultiModal.value = false;
  formMultiValue.value.names = [];
};
const personList = allPerson;
const renderingList = computed(() => getRenderingList(personList));

const reSort = () => {
  personList.value = shuffleArray(personList.value);
  renderingList.value = getRenderingList(personList);
  console.log('reSort!');
};

function shuffleArray(array)
{
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--)
  {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

allSeats.value = allPerson.value.map((name, index) => {
  return { name: name, isSeat: true, index: index };
});
edgeSeatsIndex.value = parseEdgeSeatIndex(allPerson);
//whoInEdgeSeats.value = edgeSeatsIndex.value.map(index => allSeats[index]);
/*onMounted(()=>{
  console.log(edgeSeatsIndex)
})*/
</script>
<!--suppress CssUnresolvedCustomProperty -->
<style scoped>
button, [type='button'], [type='reset'], [type='submit'] {
  -webkit-appearance: button;
  background-color: var(--n-color);
  background-image: none;
}
</style>

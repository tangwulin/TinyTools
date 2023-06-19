<template>
  <div>

    <div class="flex items-center justify-center h-1/2">
      <draggable v-model="renderingList" filter=".should-not-be-dragged" :swap="true" animation="150"
                 class="text-center w-2/3 h-1/2 grid grid-cols-11" item-key="id">
        <template #item="{ element }">
          <NButton v-if="element.isSeat" :color="element.color" size="large">{{ element.name }}</NButton>
          <div v-else-if="!element.isDashed" class="should-not-be-dragged"></div>
          <NButton v-else dashed class="should-not-be-dragged"></NButton>
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
        <n-button @click="showAddModal=true">增加人员</n-button>
        <n-button @click="showAddMultiModal=true">批量增加人员</n-button>
      </n-button-group>
    </div>

    <n-modal v-model:show="showAddModal">
      <n-card
          style="width: 50%"
          title="增加人员"
          :bordered="true"
          size="huge"
          role="dialog"
          aria-modal="true"
      >
        <n-form :label-width="80" :model="formValue" :rules="rules">
          <n-form-item label="姓名" path="name">
            <n-input v-model:value="formValue.name" placeholder="姓名"/>
          </n-form-item>
          <n-form-item label="性别" path="sex">
            <n-select v-model:value="formValue.sex" :options="sexOption" placeholder="选择性别"/>
          </n-form-item>
        </n-form>
        <template #footer>
          尾部
        </template>
      </n-card>
    </n-modal>

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
          <n-form-item label="请在下方输入姓名，以空格或英文逗号分割" path="input">
            <n-input v-model:value="formMultiValue.input" type="textarea" placeholder="以空格或逗号分割的多个姓名"
                     @blur="parseName" @focus="parseName" @keyup="parseName"/>
          </n-form-item>
          <n-form-item label="解析到的姓名" path="names">
            <n-dynamic-tags v-model:value="formMultiValue.names"/>
          </n-form-item>
        </n-form>
        <template #footer >
          <div class="flex">
            <NButton class="ml-auto" type="primary" @click="addPerson">保存</NButton>
          </div>
        </template>
      </n-card>

    </n-modal>
  </div>
</template>

<script setup>
import { NButton, NModal, NCard, NForm, NFormItem, NInput, NSelect, NDynamicTags, useMessage } from 'naive-ui';
import draggable from "vuedraggable-swap";
//import { useSeatStore } from "@/stores/seats";
import { usePersonStore } from "@/stores/person";
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";

const message = useMessage()
const showAddModal = ref(false);
const showAddMultiModal = ref(false);

const formValue = ref({ name: "", sex: "" });

const formMultiValue = ref({ input: '', names: [] });

const parseName = () => {
  formMultiValue.value.names = formMultiValue.value.input.split(/[,\s]+/);
};

const sexOption = [
  {
    label: "男",
    value: "男",
  },
  {
    label: "女",
    value: "女",
  }
];
const rules = { name: { required: true, message: "请输入姓名", trigger: "blur" } };

const getRenderingList = (x) => {
  let result;
  result = x.value.map((name)=>{return { name: name, isSeat: true }}).flatMap((value, index) => {
    if ((index + 1) % 2 === 0 && (index + 1) % 8 !== 0)
    {
      return [value, { name: null, isSeat: false }];
    } else
    {
      return value;
    }
  });

  let remaining = Math.ceil(11 - (result.length / 11) + 1);

  if (remaining % 3 !== 0)
  {
    for (let i = 0; i < remaining % 3; i++)
    {
      result.push({ name: null, isSeat: false, isDashed: true });
    }
  }

  for (let i = 0; i < (remaining - remaining % 3) / 3; i++)
  {
    result.push({ name: null, isSeat: false }, { name: null, isSeat: false, isDashed: true }, {
      name: null,
      isSeat: false,
      isDashed: true
    });
  }

  return result;
};

//const seatStore = useSeatStore()
const personStore = usePersonStore();
//const { allSeats, whoInEdgeSeats } = storeToRefs(seatStore)
const { allPerson } = storeToRefs(personStore);

const addPerson = () => {
  if(formMultiValue.value.names.length===0) message.warning("至少添加一个")
  allPerson.value.push(...formMultiValue.value.names)
  //personList.value=allPerson.value
  //renderingList.value = getRenderingList(personList)
  message.success("添加成功，共添加了"+formMultiValue.value.names.length+"个")
  console.log(renderingList.value)
  showAddMultiModal.value=false
}
//const personList = ref(getList(60));
const personList = allPerson;
const renderingList = computed(()=>getRenderingList(personList))

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

</script>
<!--suppress CssUnresolvedCustomProperty -->
<style scoped>
button, [type='button'], [type='reset'], [type='submit'] {
  -webkit-appearance: button;
  background-color: var(--n-color);
  background-image: none;
}
</style>

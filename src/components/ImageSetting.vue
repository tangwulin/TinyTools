<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/stores/setting'
import { InfoFilled } from '@vicons/material'
import { NButton } from 'naive-ui'

const setting = useSettingStore()

const { imageFormat, pngScale } = storeToRefs(setting)
const choices = ref(
    [
      {
        value: 'png',
        label: 'PNG',
        description: '兼容性好，尺寸较小，但放大后会糊'
      },
      {
        value: 'svg',
        label: 'SVG',
        description: '兼容性中等，尺寸稍大（理论上能比PNG更小，但是我做不出来那个效果），放大后不会糊'
      }
    ])


</script>

<template>
  <div class="m-2">
    <n-space vertical>
      <div>
        <p>图片格式</p>
        <n-radio-group v-model:value="imageFormat" name="format">
          <n-space>
            <template v-for="choice in choices" :key="choice.value">
              <div class="flex justify-center items-center">
                <n-radio :value="choice.value">{{ choice.label }}</n-radio>
                <n-popover trigger="hover" placement="bottom" :duration="500">
                  <template #trigger>
                    <n-button text>
                      <template #icon>
                        <n-icon>
                          <info-filled/>
                        </n-icon>
                      </template>
                    </n-button>
                  </template>
                  <span>{{ choice.description }}</span>
                </n-popover>
              </div>
            </template>
          </n-space>
        </n-radio-group>
      </div>

      <div>
        <n-space>
          <p>PNG缩放倍数</p>
          <n-popover trigger="hover" placement="right" :duration="500">
            <template #trigger>
              <n-button text>
                <template #icon>
                  <n-icon>
                    <info-filled/>
                  </n-icon>
                </template>
              </n-button>
            </template>
            <span>用于调整生成PNG时的缩放倍率，默认为2</span>
          </n-popover>
        </n-space>
        <n-input-number v-model:value="pngScale" placeholder="请输入" :disabled="imageFormat!=='png'"/>
      </div>
    </n-space>
  </div>
</template>

<style scoped>

</style>
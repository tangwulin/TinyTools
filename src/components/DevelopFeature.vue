<script setup>
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'
import { checkUpdate } from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'
import { currentMonitor, WebviewWindow } from '@tauri-apps/api/window'
import { NButton, useMessage } from 'naive-ui'

const setting = useSettingStore()
const { enableDocking, enableDevelopFeature } = storeToRefs(setting)

const message = useMessage()

const isTauri = window.__TAURI_METADATA__ !== undefined
const openDockWindow = async () => {
  const monitor = await currentMonitor()
  const dock = new WebviewWindow('dock', {
    url: '/test',
    width: monitor.size.width * 0.5,
    height: monitor.size.height * 0.15,
    resizable: false,
    x: monitor.size.width * 0.25,
    y: monitor.size.height * 0.75,
    transparent: true,
    decorations: false,
    alwaysOnTop: true,
    skipTaskbar: true
  })
  await dock.once('tauri://created', function () {
    // webview window successfully created
    message.success('dock已启动！')
  })
  await dock.once('tauri://error', function (e) {
    // an error occurred during webview window creation
    message.error('dock创建失败！错误信息：' + JSON.stringify(e))
  })
}

const closeDockWindow = () => {
  const dock = WebviewWindow.getByLabel('dock')
  if (dock === null)
  {
    message.error('dock未创建！')
  }
  else
  {
    message.success('dock已关闭！')
    dock.close()
  }
}
const checkUpdates = async () => {
  const update = await checkUpdate()
  message.info('检查更新结果：' + JSON.stringify(update))
}

const disableDevelopFeature = () => {
  enableDevelopFeature.value = false
  relaunch()
}

const clearData = () => {
  localStorage.clear()
  message.success('数据已清除！程序即将重启！')
  setTimeout(() => {
    relaunch()
  }, 1000)
}

</script>

<template>
  <n-space vertical>
    <n-space justify="space-between">
      <n-space class="items-center">
        <div>更改后请重启程序</div>
        <n-button :disabled="!isTauri" type="primary" round @click="relaunch">重启</n-button>
      </n-space>
      <n-space class="items-center">
        <n-button :disabled="!isTauri" type="error" round @click="clearData">清除数据</n-button>
        <n-button :disabled="!isTauri" type="error" round @click="disableDevelopFeature">关闭调试功能</n-button>
      </n-space>
    </n-space>
    <n-space class="items-center">
      <n-button :disabled="!isTauri" type="primary" round @click="openDockWindow">启动dock</n-button>
      <n-button :disabled="!isTauri" type="primary" round @click="closeDockWindow">关闭dock</n-button>
    </n-space>
    <n-space class="items-center">
      <p>手动检查更新</p>
      <n-button @click="checkUpdates">调用Invoke</n-button>
    </n-space>
    <n-space class="items-center">
      <p>启用dock栏</p>
      <n-switch v-model:value="enableDocking"/>
    </n-space>
  </n-space>

</template>

<style scoped>

</style>
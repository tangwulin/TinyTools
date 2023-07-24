<script setup>
import { checkUpdate } from '@tauri-apps/api/updater';
import { currentMonitor, WebviewWindow } from '@tauri-apps/api/window'
import { NButton, useMessage } from 'naive-ui'

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
    dock.close()
  }
}
const checkUpdates = async () => {
  const update = await checkUpdate()
  message.info('检查更新结果：' + JSON.stringify(update)
}
</script>

<template>
  <n-space vertical>
    <n-space >
      <n-button :disabled="!isTauri" type="primary" round @click="openDockWindow">启动dock</n-button>
      <n-button :disabled="!isTauri" type="primary" round @click="closeDockWindow">关闭dock</n-button>
    </n-space>
    <n-space>
      <n-button @click="checkUpdates">调用Invoke</n-button>
    </n-space>
  </n-space>

</template>

<style scoped>

</style>
<script setup>
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
</script>

<template>
  <n-button @click="openDockWindow" :disabled="!isTauri">打开dock窗口</n-button>
  <n-button @click="closeDockWindow" :disabled="!isTauri">关闭dock窗口</n-button>
</template>

<style scoped>

</style>
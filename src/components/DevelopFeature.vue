<script setup>
import { currentMonitor, WebviewWindow } from '@tauri-apps/api/window'
import { NButton } from 'naive-ui'

const openDockWindow = async () => {
  const monitor = await currentMonitor()
  const width = monitor.size.width * 0.5
  const height = monitor.size.height * 0.15
  const dock = new WebviewWindow('dock', {
    url: '/test',
    width: width,
    height: height,
    resizable: false,
    x: monitor.size.width * 0.25,
    y: monitor.size.height * 0.75,
    transparent: true,
    decorations: false,
    skipTaskbar: true
  })
  await dock.once('tauri://created', function () {
    // webview window successfully created
  })
  await dock.once('tauri://error', function (e) {
    // an error occurred during webview window creation
  })
}

const closeDockWindow = () => {
  const dock = WebviewWindow.getByLabel('dock')
  dock.close()
}
</script>

<template>
  <n-button @click="openDockWindow">打开dock窗口</n-button>
  <n-button @click="closeDockWindow">关闭dock窗口</n-button>
</template>

<style scoped>

</style>
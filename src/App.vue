<script setup>
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'
import { NMessageProvider } from 'naive-ui'
import { listen } from '@tauri-apps/api/event'
import { onMounted } from 'vue'
import { currentMonitor, WebviewWindow,getCurrent } from '@tauri-apps/api/window'

const setting = useSettingStore()
const { enableDocking } = storeToRefs(setting)

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
    // message.success('dock已启动！')
  })
  await dock.once('tauri://error', function (e) {
    // an error occurred during webview window creation
    // message.error('dock创建失败！错误信息：' + JSON.stringify(e))
  })
}
const listenClose = async () => {
  const unlisten = await listen('tauri://close-requested', async () => {
    const mainWindow = getCurrent()
    if (enableDocking.value)
    {
      await openDockWindow()
      await mainWindow.hide()
    }
    else{
      await mainWindow.close()
    }
  })
}

onMounted(() => {
  listenClose()
})
</script>
<template>
  <n-message-provider>
    <router-view/>
  </n-message-provider>
</template>

<style>
@font-face {
  font-family: 'CustomFont';
  src: url('@/assets/fonts/zh-cn.ttf') format('truetype');
}

body {
  font-family: 'CustomFont', sans-serif;
  background: transparent
}
</style>

<script setup>
//import { RouterLink, RouterView } from 'vue-router'
import { appWindow } from '@tauri-apps/api/window'
import { NMessageProvider } from 'naive-ui'
import MainView from '@/views/MainView.vue'

appWindow.setDecorations(true)
</script>
<template>
  <n-message-provider>
    <MainView style="background: white;height: 100vh;width: 100vw;margin: 0"/>
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

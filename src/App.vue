<script setup>
//import { RouterLink, RouterView } from 'vue-router'
import { appWindow } from '@tauri-apps/api/window'
import { NMessageProvider } from 'naive-ui'
import MainView from '@/views/MainView.vue'

appWindow.setDecorations(true)
</script>
<template>
  <n-message-provider>
    <MainView/>
  </n-message-provider>
</template>

<style>
@font-face {
  font-family: 'CustomFont';
  src: url('@/assets/fonts/zh-cn.ttf') format('truetype');
}

body {
  font-family: 'CustomFont', sans-serif;
}
</style>

<script setup>
//import { RouterLink, RouterView } from 'vue-router'
import { NMessageProvider } from 'naive-ui'

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

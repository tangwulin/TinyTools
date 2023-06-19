<script setup>
//import { RouterLink, RouterView } from 'vue-router'
import { NMessageProvider } from 'naive-ui';
import MainView from "@/views/MainView.vue";
</script>
<template>
  <n-message-provider>
<!--    <NSpace>
      <RouterLink to="/">MainView</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/home">Home</RouterLink>
      <RouterLink to="/seat">Seat</RouterLink>
    </NSpace>
    <RouterView />-->
    <MainView/>
  </n-message-provider>
</template>


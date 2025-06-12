<template>
  <div class="side-bar-container">
    侧边栏
    <el-button @click="sidebar.expand = !sidebar.expand">
      切换
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()
const sidebar = computed(() => appStore.sidebar)
</script>

<style scoped lang="scss">
.side-bar-container{
  width: v-bind('sidebar.expand ? sidebar.foldingWidth : sidebar.expansionWidth');
  height: 100%;
  background-color: #304156;
}
</style>

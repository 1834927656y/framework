<template>
  <div class="tags-view-container">
    标签导航
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()
const tagsView = computed(() => appStore.tagsView)
</script>

<style scoped lang="scss">
.tags-view-container{
  height: v-bind('tagsView.height');
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.3);
}
</style>

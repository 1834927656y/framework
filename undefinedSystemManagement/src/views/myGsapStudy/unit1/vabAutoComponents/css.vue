<template>
  <div class="cssPresentation">
    
  </div>
  可直接在动画中设置css，需以驼峰命名
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  gsap.to('.cssPresentation', {
    width: '100px',
    height: '100px',
    backgroundColor: 'red',
    duration: 10,
  })
})
</script>

<style scoped lang="scss">
.cssPresentation {
  width: 10px;
  height: 10px;
  background-color: #f0f2f5;
}
</style>

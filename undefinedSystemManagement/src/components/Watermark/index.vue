<template>
  <div class="watermark-container" ref="containerRef">
    <div class="watermark-text">
      <span>Watermark</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const containerRef = ref(null)
const container = computed(() => {
    return {
        width: containerRef.value.clientWidth,
        height: containerRef.value.clientHeight,
    }
})
onMounted(() => {
    console.log(container.value)
})
</script>

<style scoped lang="scss">
.watermark-container{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
}
</style>

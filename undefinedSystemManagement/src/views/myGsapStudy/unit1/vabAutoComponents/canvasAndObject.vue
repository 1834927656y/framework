<template>
  <canvas id="canvas" width="300" height="300"></canvas>
  通常gsap会通过对存储canvas配置的对象的值进行更改，以实现对于canvas等的动画，但是配置对象的层级不能太深，否则gsap会无法正确更新，若是太深则需要单独对其进行gsap动画。
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

const canvas = ref<HTMLCanvasElement>()
const ctx = ref<CanvasRenderingContext2D>()

// 使用 reactive 而不是 ref
const cssObject = reactive({
  fillColor: 'red',
  fillRect: {x: 0, y: 0, width: 100, height: 100}
})

onMounted(() => {
  canvas.value = document.getElementById('canvas') as HTMLCanvasElement
  ctx.value = canvas.value.getContext('2d')
  
  // 检查 Canvas 上下文
  if (!ctx.value) {
    console.error('Canvas 上下文获取失败');
    return;
  }
  
  // console.log('Canvas 初始化完成');
  
  // 初始绘制
  ctx.value.fillStyle = cssObject.fillColor
  ctx.value.fillRect(
    cssObject.fillRect.x, 
    cssObject.fillRect.y, 
    cssObject.fillRect.width, 
    cssObject.fillRect.height
  )
  
  // console.log('初始绘制完成');

  // 动画 reactive 对象
  gsap.to(cssObject, {
    fillColor: 'blue',
    duration: 3,
    repeat: -1,
    yoyo: true,
    onUpdate: () => {
      // 确保 ctx 存在
      if (!ctx.value) return;
      // 清除画布
      ctx.value.clearRect(0, 0, 300, 300);
      // 重新绘制
      ctx.value.fillStyle = cssObject.fillColor
      ctx.value.fillRect(
        cssObject.fillRect.x, 
        cssObject.fillRect.y, 
        cssObject.fillRect.width, 
        cssObject.fillRect.height
      )
    }
  })
  gsap.to(cssObject.fillRect, {
    x: 100,
    y: 100,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
    onUpdate: () => {
      // console.log('onUpdate 被调用');
    }
  })
})
</script>

<style scoped lang="scss">
canvas {
  border: 1px solid #ccc; /* 添加边框便于查看 */
}
</style>

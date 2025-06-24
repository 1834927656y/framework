<template>
  <div class="div1"></div>
  <div class="div2"></div>
  <div class="div3"></div>
  <h3>out动画过程：慢 → 快速度变化：0% → 100%适用场景：元素离开、消失</h3>
  <h3>in动画过程：快 → 慢速度变化：100% → 0%适用场景：元素进入、出现</h3>
  <h3>inOut动画过程：慢 → 快 → 慢速度变化：0% → 100% → 0%适用场景：元素进入、出现</h3>
  <h3>后缀参数为弹性与阻尼，弹性强度：决定超出目标位置的距离。阻尼：决定回弹的次数和持续时间</h3>
</template>

<script setup lang="ts">

onMounted(() => {
  gsap.to('.div1', {
    x: 100,
    duration: 1,
    ease: 'elastic.in(0.5)',
    repeat: -1,
    repeatDelay: 3,
  })
  gsap.to('.div2', {
    x: 100,
    duration: 1,
    ease: 'elastic.inOut(1)',
    repeat: -1,
    repeatDelay: 3,
  })
  gsap.to('.div3', {
    x: 100,
    duration: 1,
    ease: 'elastic.out(2,2)',
    repeat: -1,
    repeatDelay: 3,
  })
})

</script>

<style scoped lang="scss">
div {
  width: 10px;
  height: 10px;
  background-color: green;
  margin-top: 10px;
}
</style>

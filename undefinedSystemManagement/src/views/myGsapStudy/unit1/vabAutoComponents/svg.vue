<template>
  <svg class="svgPresentation">
    <rect class="circle" fill="#28a92b" x="10" y="35" width="30" height="30" rx="2"  />
  </svg>
  svg的样式可以通过sttr进行设置
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

let obj = { myNum: 10, myColor: "red" };
gsap.to(obj, {
  myNum: 200,
  myColor: "blue",
  onUpdate: () => console.log(obj.myNum, obj.myColor)
});

onMounted(() => {
  gsap.to('.circle', {
    attr: {
      x: 100,
      y: 100,
      width: 30,
      height: 30,
      rx: 2,
      fill: '#1a1a1a',
    },
    duration: 10,
  })
})
</script>
<style scoped lang="scss">
.svgPresentation {
  width: 100px;
  height: 100px;
}
</style>

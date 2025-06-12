<template>
  <!-- :locale="appStore.locale" :size="appStore.size" -->
  <el-config-provider >
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts"></script>

<style  lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 去除所有元素的焦点轮廓 */
*:focus-visible {
  outline: none !important;
}


</style>

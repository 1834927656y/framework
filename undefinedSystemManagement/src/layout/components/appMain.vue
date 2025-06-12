<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <Watermark v-if="route.meta.Watermark" />
      <transition v-if="route.meta.noCache" >
        <keep-alive :include="noCacheNameView">

          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
      <transition v-else mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </section>
</template>

<script setup lang="ts">
import { useTagesViewStore } from '@/store/modules/tagesView'
const tagesViewStore = useTagesViewStore()

const noCacheNameView = computed(() => tagesViewStore.noCacheView)
</script>

<style scoped lang="scss">
.app-main{
  width: 100%;
  height: 100%;
  position: relative;
}  
</style>

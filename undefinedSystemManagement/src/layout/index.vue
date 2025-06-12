<template>
  <div class="layout-container">
    <SideBar v-if="sidebar.exist"/>
    <div class="layout-wrapper" :class="sidebar.exist ? 'layout-wrapper-collapse' : 'layout-wrapper-unfold'">   
      <div class="layout-header">
        <NaverBar v-if="navBar.exist"/>
        <TagsView v-if="tagesViewArray.length > 0"/>
      </div>
      <AppMain/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AppMain, TagsView, NaverBar, SideBar } from './components'
import { useAppStore } from '@/store/modules/app'
import { useTagesViewStore } from '@/store/modules/tagesView'
const appStore = useAppStore()
const tagesViewStore = useTagesViewStore()
const sidebar = computed(() => appStore.sidebar)
const tagesViewArray = computed(() => tagesViewStore.tagesViewArray)
const navBar = computed(() => appStore.navBar)
</script>

<style scoped lang="scss">
.layout-container{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  .layout-wrapper{
    height: 100%;
    display: flex;
    flex-direction: column;
    &-collapse{
      width: calc(100% - v-bind('sidebar.expand ? sidebar.foldingWidth : sidebar.expansionWidth'));
    }
    &-unfold{
      width: 100%;
    } 
    .layout-header{
      width: 100%;
      flex-shrink: 0;
    }
    .app-main{
      flex: 1;
    }
   
  }
}
</style>

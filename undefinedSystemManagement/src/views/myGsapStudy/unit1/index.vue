<template>
  <div class="gsapPresentation">
    <el-menu  mode="horizontal">
      <el-menu-item v-for="item in menuList" :key="item.title" :index="item.title" @click="handleClick(item)">
          {{ item.title }}
      </el-menu-item>
    </el-menu>
   
    <div class="dialog-container" v-if="dialog.visible">
      <keep-alive>
      <component :is="dialog.component" :item="dialog.item"></component>
      </keep-alive>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'
const appStore = useAppStore()
onMounted(() => {
  appStore.setSidebar({
    exist: false,
  })
  appStore.setNavBar({
    exist: false,
  })
})
const dialog = reactive<any>({
  visible: false,
  title: '',
  component: '',
  width: '30vw',
  item: {}
});
const menuList = ref([
  {
    title: '补间动画',
    path: 'MyGsapStudyUnit1TweenAnimation'
  },
  {
    title: 'CSS',
    path: 'MyGsapStudyUnit1Css'
  },
  {
    title: 'SVG',
    path: 'MyGsapStudyUnit1Svg'
  },
  {
    title: 'CanvasAndObject',
    path: 'MyGsapStudyUnit1CanvasAndObject'
  },
  {
    title: 'EASE',
    path: 'MyGsapStudyUnit1Ease'
  },
  {
    title: 'Staggers',
    path: 'MyGsapStudyUnit1Staggers'
  }
])
const handleClick = (item: any) => {
  dialog.component = item.path
  dialog.visible = true
}


</script>

<style scoped lang="scss">
</style>

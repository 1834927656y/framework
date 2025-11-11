<template>
  <el-row class="nav-bar-container" type="flex" align="middle">
    <!-- 左侧 Logo 和系统名称 -->
    <el-col :span="4" class="logo-container">
      <img src="@/assets/logo.png" alt="logo" class="logo" />
      <span class="system-title">统一系统管理平台</span>
    </el-col>

    <!-- 中间导航选项 -->
    <el-col :span="18"  class="nav-center">
      <el-input v-model="search" style="width: 20%; height: 80%; top: 10%; margin-left: auto; right: 2%;">
            <template #suffix>
              <el-icon><Search /></el-icon>
            </template>
      </el-input>
      <el-menu mode="horizontal" :router="true" :ellipsis="false" :default-active="activeMenu">
        <el-menu-item index="/my/Application">我的应用</el-menu-item>
        <el-menu-item index="/my/Account">我的账户</el-menu-item>
        <el-menu-item>后台管理</el-menu-item>
      </el-menu>
    </el-col>

    <!-- 右侧用户信息 -->
    <el-col :span="2"  class="nav-right">
      <el-dropdown >
        <div class="user-info">
          <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <span class="username">管理员</span>
          <el-icon><arrow-down /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon><user /></el-icon>我的账户
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><switch-button /></el-icon>退出登录
            </el-dropdown-item>
            <el-dropdown-item divided @click="switchLanguage">
              <el-icon><Refresh /></el-icon>切换语言
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ArrowDown, User, SwitchButton } from '@element-plus/icons-vue'
import { useAppStore } from '@/store/modules/app'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
const {locale} = useI18n()

const appStore = useAppStore()
const navBar = computed(() => appStore.navBar)
const search = ref('')
const route = useRoute()
const activeMenu = computed(() => {
  return route.path
})

const switchLanguage = () => {
  locale.value = locale.value === 'zhCN' ? 'en' : 'zhCN'
}
</script>

<style scoped lang="scss">
.nav-bar-container {
  width: 100%;
  height: v-bind('navBar.height');
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.3);
  :deep(.el-col){
    height: 100%;
  }
  .logo-container{
    display: flex;
    align-items: center;
    .logo{
      width: 50%;
      height: 100%;
    }
    .system-title{
      flex: 1;
      font-size: 16px;
      color: #333;
      line-height: 50px;
      white-space: nowrap;
    }
  }
 .nav-center{
  display: flex;
  justify-content: center;
   :deep(.el-menu){
      height: 100%;
      border-bottom: none;
    }
    :deep(.el-input__wrapper){
        border-radius:9999px ;
        input{
          margin-left: 10px;
        }
    }
 }
 .nav-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 20px;
    .username {
      margin: 0 8px;
    }
  }
}
}

</style>

<template>
  <div style="width: 100%;height: 100%;padding: 20px;box-sizing: border-box;">
    <el-card class="box-card">
      <template #header >
        <span style="font-size: 20px;font-weight: 600;">我的应用</span>
      </template>
      <div class="app-list">
        <div style="width: 100%;height: 20%; display: flex;flex-direction: row;gap: 90px;">
          <MyApplicationCard :appNumber=1 :title="appList[0].title" backgroundColor="#01579b" style="width: 140px;height: 140px; margin-left: 13%;" @click="handleClick(appList[0].link)" />
          <MyApplicationCard :appNumber=2 :title="appList[1].title" backgroundColor="#141414" style="width: 140px;height: 140px;" @click="handleClick(appList[1].link)" />
          <MyApplicationCard :appNumber=3 :title="appList[0].title" backgroundColor="#2980fe" style="width: 140px;height: 140px;" />
          <MyApplicationCard :appNumber=4 :title="appList[0].title"  style="width: 140px;height: 140px;" />
          <MyApplicationCard :appNumber=5 :title="appList[0].title"  style="width: 140px;height: 140px;" />
        </div>
        <div style="width: 100%;height: 20%; display: flex;flex-direction: row;gap: 90px;">
          <MyApplicationCard :appNumber=1 :title="appList[0].title" style="width: 140px;height: 140px; margin-left: 13%;" />
          <MyApplicationCard :appNumber=1 :title="appList[0].title" style="width: 140px;height: 140px;" />
          <MyApplicationCard :appNumber=6 :title="appList[0].title" style="width: 140px;height: 140px;" />
        </div>
      </div>
    </el-card>
  </div>
</template>
  
<script setup lang="ts">
  const router = useRouter()  
  // 创建响应式的应用列表数据
  const appList = ref<Array<{
    title: string
    description: string
    icon?: string
    link?: string
  }>>([
    {
      title: '数据治理平台',
      description: '系统管理模管理、角色管理、权限管理等功能',
      icon: 'http://192.168.10.142/assets/logo-BlO0eYc6.png',
      link: 'http://192.168.10.142/login?redirect=/index'
    },
    {
      title: '资产管理平台',
      description: '工作流程管理，支持流程设计、流程部署、流程监控等功能',
      icon: '/src/assets/icons/workflow.png',
      link: '/my/Account'
    },
  ])

  const handleClick = (link: string) => {
    // 判断是否为外部链接
    const isExternalLink = (url: string): boolean => {
      // 方法1：检查是否包含 http 或 https
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return true
      }
      
      // 方法2：检查是否为完整的URL
      try {
        const urlObj = new URL(url, window.location.origin)
        return urlObj.origin !== window.location.origin
      } catch {
        // 如果URL解析失败，可能是相对路径
        return false
      }
    }
    
    // 判断是否为内部路由
    const isInternalRoute = (url: string): boolean => {
      // 检查是否为相对路径或以 / 开头
      return url.startsWith('/') || !url.includes('://')
    }
    
    if (isExternalLink(link)) {
      // 外部链接：在新窗口打开
      window.open(link, '_blank', 'noopener,noreferrer')
    } else if (isInternalRoute(link)) {
      // 内部路由：使用 Vue Router 导航
      router.push(link)
    } else {
      // 其他情况：在当前窗口打开
      window.location.href = link
    }
  }

</script>
  
<style scoped lang="scss">
  .box-card{
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    > :deep(.el-card__body) {
      width: 100%;
      height: 90%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .app-list{
      width: 80%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 120px;
    }
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-col {
    height: 100%;
    margin-bottom: 20px;
  }


</style>
  
<template>
    <div style="width: 100%;height: 100%;padding: 20px;box-sizing: border-box;">
      <el-card class="box-card">
        <template #header>
          <span style="font-size: 20px;font-weight: 600;">我的应用</span>
        </template>
        <el-card style="width: 100%; height: 10%; margin-bottom: 1%;">
          <el-row :gutter="20">
            <el-col :span="2">
              <span class="app-name">应用名称: </span>
            </el-col>
            <el-col :span="4">
              <el-input v-model="appName" placeholder="请输入应用名称" />
            </el-col>
            <el-col :span="3" :offset="15">
              <el-button type="primary" icon="Search" @click="handleSearch">
                搜索
              </el-button>
              <el-button  icon="Refresh" @click="handleReset">重置</el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-card style="width: 100%; flex: 1;" :body-style="{ height: '100%', position: 'relative', padding: '40px' }">
          <template v-if="displayAppList.length === 0">
            <el-empty description="暂无应用数据" />
          </template>
          <template v-else>
            <el-row :gutter="20" v-for="(row, rowIndex) in displayAppList" :key="rowIndex" style="margin-bottom: 20px;height: 24%;">
              <el-col :span="4" v-for="(app, colIndex) in row" :key="colIndex" style="height: 100%;">
                <MyApplicationCard 
                  v-if="app"
                  :title="app.title" 
                  :description="app.description" 
                  :icon="app.icon" 
                  :link="app.link" 
                />
              </el-col>
            </el-row>
          </template>
          <AppPager :total="pagination.total" :pageNum="pagination.pageNum" :pageSize="pagination.pageSize" @update:pageNum="handlePageNumChange" />
        </el-card>
      </el-card>
    </div>
  </template>
  
  <script setup lang="ts">
    import { ref, computed, onMounted } from 'vue'

    // 创建响应式的应用列表数据
    const appList = ref<Array<{
      title: string
      description: string
      icon?: string
      link?: string
    }>>([
      {
        title: '数据治理平台',
        description: '系统管理模块，包含用户管理、角色管理、权限管理等功能系统管理模块，包含用户管理、角色管理、权限管理等功能系统管理模块，包含用户管理、角色管理、权限管理等功能',
        icon: 'http://192.168.10.142/assets/logo-BlO0eYc6.png',
        link: 'http://192.168.10.142/login?redirect=/index'
      },
      {
        title: '工作流管理',
        description: '工作流程管理，支持流程设计、流程部署、流程监控等功能',
        icon: '/src/assets/icons/workflow.png',
        link: '/workflow'
      },
      
      {
        title: '消息中心',
        description: '系统消息管理，包括站内信、邮件、短信等消息通知',
        icon: '/src/assets/icons/message.png',
        link: '/message'
      },
      {
        title: '文档管理',
        description: '文档在线编辑、版本控制、文档共享等功能',
        icon: '/src/assets/icons/document.png',
        link: '/document'
      },
      {
        title: '任务管理',
        description: '任务分配、跟踪、统计等功能',
        icon: '/src/assets/icons/task.png',
        link: '/task'
      },
      {
        title: '知识库',
        description: '知识文档管理、知识分享、知识检索等功能',
        icon: '/src/assets/icons/knowledge.png',
        link: '/knowledge'
      },
      {
        title: '项目管理',
        description: '项目创建、任务分配、进度跟踪、资源管理等功能',
        icon: '/src/assets/icons/project.png',
        link: '/project'
      },
      {
        title: '资产管理',
        description: '资产登记、资产盘点、资产维护等功能',
        icon: '/src/assets/icons/asset.png',
        link: '/asset'
      },
      {
        title: '客户管理',
        description: '客户信息管理、客户关系维护、客户服务等功能',
        icon: '/src/assets/icons/customer.png',
        link: '/customer'
      },
      {
        title: '供应商管理',
        description: '供应商信息管理、供应商评估、供应商合作等功能',
        icon: '/src/assets/icons/supplier.png',
        link: '/supplier'
      },
      {
        title: '合同管理',
        description: '合同创建、审批、执行、归档等功能',
        icon: '/src/assets/icons/contract.png',
        link: '/contract'
      },
      {
        title: '财务管理',
        description: '财务收支管理、财务报表、财务分析等功能',
        icon: '/src/assets/icons/finance.png',
        link: '/finance'
      },
      {
        title: '人事管理',
        description: '员工信息管理、考勤管理、绩效管理等功能',
        icon: '/src/assets/icons/hr.png',
        link: '/hr'
      },
      {
        title: '设备管理',
        description: '设备信息管理、设备维护、设备监控等功能',
        icon: '/src/assets/icons/device.png',
        link: '/device'
      },
      {
        title: '库存管理',
        description: '库存查询、入库管理、出库管理、库存预警等功能',
        icon: '/src/assets/icons/inventory.png',
        link: '/inventory'
      },
      {
        title: '质量管理',
        description: '质量检查、质量评估、质量报告等功能',
        icon: '/src/assets/icons/quality.png',
        link: '/quality'
      },
      {
        title: '安全管理',
        description: '安全检查、安全培训、事故管理等功能',
        icon: '/src/assets/icons/safety.png',
        link: '/safety'
      }
    ])
    
    const pagination = ref<{
      pageNum?: number
      pageSize?: number
      total?: number
    }>({
      pageNum: 1,
      pageSize: 18,
      total: appList.value.length
    })

    const appName = ref('')

    // 将数据转换为3行6列的二维数组
    const displayAppList = computed(() => {
      const rows = []
      for (let i = 0; i < 3; i++) {
        const row = appList.value.slice(i * 6, (i + 1) * 6)
        rows.push(row)
      }
      return rows
    })

    // 搜索功能
    const handleSearch = () => {
      // 实现搜索逻辑
      const searchResult = appList.value.filter(app => 
        app.title.toLowerCase().includes(appName.value.toLowerCase())
      )
      appList.value = searchResult
    }

    // 重置功能
    const handleReset = () => {
      appName.value = ''
      // 重置为原始数据
      appList.value = [
        // ... 这里需要保存原始数据的副本
      ]
    }

    const handlePageNumChange = () => {
      
    }

    // 如果需要从后端获取数据，可以添加一个获取数据的方法
    const fetchAppList = async () => {
      try {
        // 这里添加获取数据的逻辑
        // const response = await api.getAppList()
        // appList.value = response.data
      } catch (error) {
        console.error('获取应用列表失败:', error)
      }
    }

    // 在组件挂载时获取数据
    onMounted(() => {
      fetchAppList()
    })
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
        height: 100%;
        display: flex;
        flex-direction: column;
      }
      
      .app-name{
        display: block;
        width: 40%;
        margin-left: auto;
        white-space: nowrap;
        line-height: 32px;
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
  
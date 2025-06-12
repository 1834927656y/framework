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
        <el-card style="width: 100%; flex: 1;" :body-style="{ height: '100%' }">
          <template v-if="paginatedAppList.length === 0">
            <el-empty description="暂无应用数据" />
          </template>
          <template v-else>
            <el-row :gutter="20" v-for="(row, rowIndex) in paginatedAppList" :key="rowIndex" style="margin-bottom: 20px;height: 26%;">
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
        </el-card>
    
      </el-card>
    </div>
  </template>
  
  <script setup lang="ts">
    const appName = ref('')
    const appList = ref([
      {
        title: '数据治理平台',
        description: '1',
        icon: 'item1',
        link: 'http://192.168.10.142/login?redirect=/index'
      },
      {
        title: '数据治理平台',
        description: '2',
        icon: 'item1',
        link: 'http://192.168.10.142/login?redirect=/index'
      },
      {
        title: '数据治理平台',
        description: '3',
        icon: 'item1',
        link: 'http://192.168.10.142/login?redirect=/index'
      },
      {
        title: '数据治理平台',
        description: '4',
        icon: 'item1',
        link: 'http://192.168.10.142/login?redirect=/index'
      },
      {
        title: '数据治理平台',
        description: '5',
        icon: 'item1',
        link: 'http://192.168.10.142/login?redirect=/index'
      },
      {
        title: '数据治理平台',
        description: '6',
        icon: 'item1',
        link: 'http://192.168.10.142/login?redirect=/index'
      },
      {
        title: '数据治理平台',
        description: '7',
        icon: 'item1',
        link: 'http://192.168.10.142/login?redirect=/index'
      },
      {
        title: '数据治理平台',
        description: '8',
        icon: 'item1',
        link: 'http://192.168.10.142/login?redirect=/index'
      },
      {
        title: '数据治理平台',
        description: '9',
        icon: 'item1',
        link: 'http://192.168.10.142/login?redirect=/index'
      },
    ])

    // 每行显示的应用数量
    const appsPerRow = 6

    // 计算分页后的数据
    const paginatedAppList = computed(() => {
      const rows = []
      for (let i = 0; i < appList.value.length; i += appsPerRow) {
        const row = appList.value.slice(i, i + appsPerRow)
        // 如果这一行不满 appsPerRow 个，用 null 补齐
        while (row.length < appsPerRow) {
          row.push(null)
        }
        rows.push(row)
      }
      return rows
    })

    // 搜索功能
    const handleSearch = () => {
      // 实现搜索逻辑
    }

    // 重置功能
    const handleReset = () => {
      appName.value = ''
      // 重置其他搜索条件
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
  </style>
  
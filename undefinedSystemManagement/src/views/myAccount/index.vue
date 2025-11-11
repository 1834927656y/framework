<template>
  <div style="width: 100%;height: 100%;padding: 20px;box-sizing: border-box;">
    <el-card class="box-card">
      <template #header>
        <span style="font-size: 20px;font-weight: 600;">{{ $t('myAccount.title') }}</span>
      </template>
      
      <el-row :gutter="20">
        <!-- 左侧个人信息卡片 -->
        <el-col :span="6" :xs="24">
          <el-card class="user-card">
            <template #header>
              <div class="clearfix">
                <span>{{ $t('myAccount.userInfo.title') }}</span>
              </div>
            </template>
            <div>
              <div class="text-center">
                <el-avatar :size="100" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
              </div>
              <ul class="list-group">
                <li class="list-group-item">
                  <el-icon><User /></el-icon>{{ $ts('用户名称') }}
                  <div class="pull-right">admin</div>
                </li>
                <li class="list-group-item">
                  <el-icon><Phone /></el-icon>手机号码
                  <div class="pull-right">13800138000</div>
                </li>
                <li class="list-group-item">
                  <el-icon><Message /></el-icon>用户邮箱
                  <div class="pull-right">admin@example.com</div>
                </li>
                <li class="list-group-item">
                  <el-icon><Office /></el-icon>所属部门
                  <div class="pull-right">研发部 / 开发组</div>
                </li>
                <li class="list-group-item">
                  <el-icon><UserFilled /></el-icon>所属角色
                  <div class="pull-right">管理员</div>
                </li>
                <li class="list-group-item">
                  <el-icon><Calendar /></el-icon>创建日期
                  <div class="pull-right">2024-01-01</div>
                </li>
              </ul>
            </div>
          </el-card>
        </el-col>

        <!-- 右侧标签页 -->
        <el-col :span="18" :xs="24">
          <el-card>
            <template #header>
              <div class="clearfix">
                <span>基本资料</span>
              </div>
            </template>
            <el-tabs v-model="activeTab">
              <el-tab-pane :label="$t('myAccount.userInfo.title')" name="userinfo">
                <el-form :model="userForm" label-width="100px">
                  <el-form-item label="用户昵称">
                    <el-input v-model="userForm.nickName" />
                  </el-form-item>
                  <el-form-item label="手机号码">
                    <el-input v-model="userForm.phonenumber" />
                  </el-form-item>
                  <el-form-item label="邮箱">
                    <el-input v-model="userForm.email" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary">保存</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="修改密码" name="resetPwd">
                <el-form :model="passwordForm" label-width="100px">
                  <el-form-item label="旧密码">
                    <el-input v-model="passwordForm.oldPassword" type="password" />
                  </el-form-item>
                  <el-form-item label="新密码">
                    <el-input v-model="passwordForm.newPassword" type="password" />
                  </el-form-item>
                  <el-form-item label="确认密码">
                    <el-input v-model="passwordForm.confirmPassword" type="password" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary">保存</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="第三方应用" name="thirdParty">
                <el-table :data="thirdPartyList">
                  <el-table-column prop="name" label="应用名称" />
                  <el-table-column prop="status" label="状态">
                    <template #default="{ row }">
                      <el-tag :type="row.status ? 'success' : 'info'">
                        {{ row.status ? '已绑定' : '未绑定' }}
                      </el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template #default="{ row }">
                      <el-button :type="row.status ? 'danger' : 'primary'" size="small">
                        {{ row.status ? '解绑' : '绑定' }}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="在线设备" name="onlineDevice">
                <el-table :data="deviceList">
                  <el-table-column prop="deviceName" label="设备名称" />
                  <el-table-column prop="loginTime" label="登录时间" />
                  <el-table-column prop="ip" label="登录IP" />
                  <el-table-column prop="location" label="登录地点" />
                  <el-table-column label="操作">
                    <template #default>
                      <el-button type="danger" size="small">强制下线</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 当前激活的标签页
const activeTab = ref('userinfo')

// 用户表单数据
const userForm = ref({
  nickName: '管理员',
  phonenumber: '13800138000',
  email: 'admin@example.com'
})

// 密码表单数据
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 第三方应用列表
const thirdPartyList = ref([
  { name: '微信', status: true },
  { name: 'QQ', status: false },
  { name: '钉钉', status: true }
])

// 在线设备列表
const deviceList = ref([
  {
    deviceName: 'Chrome浏览器',
    loginTime: '2024-01-01 12:00:00',
    ip: '192.168.1.1',
    location: '北京'
  },
  {
    deviceName: 'Safari浏览器',
    loginTime: '2024-01-01 13:00:00',
    ip: '192.168.1.2',
    location: '上海'
  }
])
</script>

<style scoped lang="scss">
.box-card {
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
}

.user-card {
  .text-center {
    text-align: center;
    margin-bottom: 20px;
  }

  .list-group {
    list-style: none;
    padding: 0;
    margin: 0;

    .list-group-item {
      padding: 12px 0;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      
      &:last-child {
        border-bottom: none;
      }

      .el-icon {
        margin-right: 8px;
        color: #909399;
      }

      .pull-right {
        margin-left: auto;
        color: #606266;
      }
    }
  }
}

.clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

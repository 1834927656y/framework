<template>
  <el-card 
    class="application-card" 
    :body-style="{ padding: '10px' }"
    shadow="hover"
    @click="handleClick"
  >
    <div class="card-content">
      <!-- 应用图标和名称区域 -->
      <div class="app-header">
        <div class="app-icon">
          <el-avatar 
            :size="48" 
            :src="icon" 
            :icon="!icon ? 'Document' : undefined"
          />
        </div>
      </div>
      
      <div class="app-info">
        <!-- 应用介绍 -->
        <h3 class="app-name">{{ title }}</h3>
        <el-tooltip
            :content="description"
            placement="top"
            :show-after="500"
            :hide-after="2000"
        >
            <p class="app-description">{{ description }}</p>
        </el-tooltip>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
  title: string
  description: string
  icon?: string
  link?: string  // 新增链接属性
}>()

const router = useRouter()

const handleClick = () => {
  if (props.link) {
    // 如果是外部链接
    if (props.link.startsWith('http')) {
      window.open(props.link, '_blank')
    } else {
      // 内部路由
      router.push(props.link)
    }
  }
}
</script>

<style scoped lang="scss">
.application-card {
  width: 100%;
  height: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  // 渐变背景效果
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      var(--el-color-primary-light-9) 0%,
      var(--el-color-primary-light-7) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    
    &::before {
      opacity: 1;
    }
  }
  
  // 点击效果
  &:active {
    transform: translateY(0) scale(0.98);
    transition: all 0.1s ease;
  }

  .card-content {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: row ;
    gap: 12px;
  }

  .app-header {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .app-icon {
    flex-shrink: 0;
    .el-avatar {
      background-color: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
      border: 2px solid var(--el-color-primary-light-5);
      transition: all 0.3s ease;
      
      &:hover {
        transform: scale(1.05);
      }
    }
  }

  .app-info {
    flex: 1;
  }

  .app-name {
    margin: 0;
    font-family: 'Microsoft YaHei', sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: var(--el-text-color-primary);
    line-height: 1.4;
  }

  .app-description {
    margin: 0;
    font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: var(--el-text-color-regular);
    line-height: 1.6;
    // 文本超出两行显示省略号
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>

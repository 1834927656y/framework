<template>
    <i 
      :class="iconClass" 
      :style="iconStyle"
      v-html="iconContent"
      v-if="iconContent"
    ></i>
    <span v-else class="icon-loading">加载中...</span>
  </template>
  
  <script setup lang="ts">
//   import { computed, ref, watch, onMounted } from 'vue'
//   import { useIconStore } from '@/utils/iconLoader'
//   import type { IconProps } from '@/types/icon'
  
  const props = defineProps({
    name: '',
    size: '1em',
    color: 'currentColor',
    prefix: '',
    localPath: '',
    remoteUrl: '',
    width: undefined,
    height: undefined,
    spin: false,
    rotate: 0,
    flip: 'none'
  })
  
  const iconStore = useIconStore()
  const iconContent = ref<string>('')
  const isLoading = ref(false)
  
  const iconClass = computed(() => {
    return [
      'custom-icon',
      `icon-${props.name}`,
      {
        'icon-spin': props.spin,
        'icon-flip-horizontal': props.flip === 'horizontal' || props.flip === 'both',
        'icon-flip-vertical': props.flip === 'vertical' || props.flip === 'both'
      }
    ]
  })
  
  const iconStyle = computed(() => {
    const style: Record<string, string> = {
      color: props.color,
      transform: `rotate(${props.rotate}deg)`
    }
    
    if (props.width) {
      style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
    } else {
      style.width = props.size
    }
    
    if (props.height) {
      style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
    } else {
      style.height = props.size
    }
    
    return style
  })
  
  const loadIcon = async () => {
    if (!props.name && !props.localPath && !props.remoteUrl) {
      iconContent.value = ''
      return
    }
  
    isLoading.value = true
    
    try {
      let svgContent = ''
      
      // 优先级：remoteUrl > localPath > name (通过配置查找)
      if (props.remoteUrl) {
        svgContent = await iconStore.loadRemoteIcon(props.remoteUrl)
      } else if (props.localPath) {
        svgContent = await iconStore.loadLocalIcon(props.localPath, props.prefix)
      } else if (props.name) {
        svgContent = await iconStore.loadIconByName(props.name, props.prefix)
      }
      
      iconContent.value = svgContent
    } catch (error) {
      console.error('图标加载失败:', error)
      iconContent.value = ''
    } finally {
      isLoading.value = false
    }
  }
  
  watch(() => [props.name, props.localPath, props.remoteUrl, props.prefix], () => {
    loadIcon()
  }, { immediate: true })
  
  onMounted(() => {
    loadIcon()
  })
  </script>
  
  <style scoped lang="scss">
  .custom-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    line-height: 1;
    
    :deep(svg) {
      width: 100%;
      height: 100%;
      fill: currentColor;
      display: block;
    }
    
    &.icon-spin {
      animation: icon-spin 1s linear infinite;
    }
    
    &.icon-flip-horizontal {
      transform: scaleX(-1);
    }
    
    &.icon-flip-vertical {
      transform: scaleY(-1);
    }
  }
  
  .icon-loading {
    display: inline-block;
    font-size: 12px;
    color: #999;
  }
  
  @keyframes icon-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  </style>
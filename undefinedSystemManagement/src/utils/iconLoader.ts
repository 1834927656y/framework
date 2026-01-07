import { defineStore } from 'pinia'
import type { IconConfig, IconLoaderConfig } from '@/types/icon'

/**
 * 图标缓存项
 */
interface IconCacheItem {
  content: string
  timestamp: number
}

/**
 * 图标加载器 Store
 */
export const useIconStore = defineStore('icon', () => {
  // 图标缓存
  const iconCache = ref<Map<string, IconCacheItem>>(new Map())
  
  // 图标配置
  const iconConfig = ref<IconLoaderConfig>({
    defaultPrefix: '',
    icons: [],
    basePath: '/src/assets/icons',
    enableCache: true,
    cacheExpiry: 24 * 60 * 60 * 1000 // 24小时
  })

  /**
   * 初始化图标配置
   */
  const initConfig = (config: IconLoaderConfig) => {
    iconConfig.value = {
      ...iconConfig.value,
      ...config
    }
  }

  /**
   * 添加图标配置
   */
  const addIconConfig = (config: IconConfig | IconConfig[]) => {
    if (!iconConfig.value.icons) {
      iconConfig.value.icons = []
    }
    
    const configs = Array.isArray(config) ? config : [config]
    iconConfig.value.icons.push(...configs)
  }

  /**
   * 从缓存获取图标
   */
  const getFromCache = (key: string): string | null => {
    if (!iconConfig.value.enableCache) {
      return null
    }

    const cached = iconCache.value.get(key)
    if (!cached) {
      return null
    }

    // 检查是否过期
    const now = Date.now()
    if (iconConfig.value.cacheExpiry && (now - cached.timestamp) > iconConfig.value.cacheExpiry) {
      iconCache.value.delete(key)
      return null
    }

    return cached.content
  }

  /**
   * 设置缓存
   */
  const setCache = (key: string, content: string) => {
    if (!iconConfig.value.enableCache) {
      return
    }

    iconCache.value.set(key, {
      content,
      timestamp: Date.now()
    })
  }

  /**
   * 清理缓存
   */
  const clearCache = () => {
    iconCache.value.clear()
  }

  /**
   * 从配置中查找图标路径
   */
  const findIconPath = (name: string, prefix?: string): string | null => {
    const searchPrefix = prefix || iconConfig.value.defaultPrefix || ''
    const icons = iconConfig.value.icons || []
    
    // 优先查找完全匹配的配置
    const exactMatch = icons.find(
      icon => icon.name === name && (icon.prefix === searchPrefix || (!icon.prefix && !searchPrefix))
    )
    
    if (exactMatch) {
      return exactMatch.path
    }

    // 如果没有前缀，尝试查找无前缀的配置
    if (!searchPrefix) {
      const noPrefixMatch = icons.find(icon => icon.name === name && !icon.prefix)
      if (noPrefixMatch) {
        return noPrefixMatch.path
      }
    }

    return null
  }

  /**
   * 加载SVG内容
   */
  const loadSvgContent = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const svgContent = await response.text()
      
      // 验证是否为有效的SVG
      if (!svgContent.trim().startsWith('<svg')) {
        throw new Error('Invalid SVG content')
      }
      
      return svgContent
    } catch (error) {
      console.error(`Failed to load SVG from ${url}:`, error)
      throw error
    }
  }

  /**
   * 从远程URL加载图标
   */
  const loadRemoteIcon = async (url: string): Promise<string> => {
    const cacheKey = `remote:${url}`
    
    // 检查缓存
    const cached = getFromCache(cacheKey)
    if (cached) {
      return cached
    }

    try {
      const svgContent = await loadSvgContent(url)
      setCache(cacheKey, svgContent)
      return svgContent
    } catch (error) {
      throw new Error(`Failed to load remote icon from ${url}: ${error}`)
    }
  }

  /**
   * 从本地路径加载图标
   */
  const loadLocalIcon = async (localPath: string, prefix?: string): Promise<string> => {
    // 处理路径
    let fullPath = localPath
    
    // 如果不是绝对路径，添加基础路径
    if (!localPath.startsWith('/') && !localPath.startsWith('http')) {
      const basePath = iconConfig.value.basePath || '/src/assets/icons'
      fullPath = `${basePath}/${localPath}`.replace(/\/+/g, '/')
    }

    // 如果路径不以 / 开头，添加 /
    if (!fullPath.startsWith('/') && !fullPath.startsWith('http')) {
      fullPath = `/${fullPath}`
    }

    const cacheKey = `local:${fullPath}:${prefix || ''}`
    
    // 检查缓存
    const cached = getFromCache(cacheKey)
    if (cached) {
      return cached
    }

    try {
      // 尝试使用 import.meta.url 动态导入（适用于 Vite）
      if (fullPath.startsWith('/src/') || fullPath.startsWith('./') || fullPath.startsWith('../')) {
        // 对于 Vite 项目，可以使用动态导入
        try {
          const module = await import(/* @vite-ignore */ fullPath + '?raw')
          const svgContent = typeof module === 'string' ? module : module.default || ''
          setCache(cacheKey, svgContent)
          return svgContent
        } catch {
          // 如果动态导入失败，尝试 fetch
          const url = new URL(fullPath, import.meta.url).href
          const svgContent = await loadSvgContent(url)
          setCache(cacheKey, svgContent)
          return svgContent
        }
      } else {
        // 使用 fetch 加载
        const svgContent = await loadSvgContent(fullPath)
        setCache(cacheKey, svgContent)
        return svgContent
      }
    } catch (error) {
      throw new Error(`Failed to load local icon from ${localPath}: ${error}`)
    }
  }

  /**
   * 通过名称加载图标
   */
  const loadIconByName = async (name: string, prefix?: string): Promise<string> => {
    const cacheKey = `name:${name}:${prefix || ''}`
    
    // 检查缓存
    const cached = getFromCache(cacheKey)
    if (cached) {
      return cached
    }

    // 从配置中查找路径
    const iconPath = findIconPath(name, prefix)
    
    if (!iconPath) {
      throw new Error(`Icon "${name}" not found in configuration${prefix ? ` with prefix "${prefix}"` : ''}`)
    }

    try {
      // 判断是远程URL还是本地路径
      if (iconPath.startsWith('http://') || iconPath.startsWith('https://')) {
        return await loadRemoteIcon(iconPath)
      } else {
        return await loadLocalIcon(iconPath, prefix)
      }
    } catch (error) {
      throw new Error(`Failed to load icon "${name}": ${error}`)
    }
  }

  return {
    // 状态
    iconConfig,
    iconCache,
    
    // 方法
    initConfig,
    addIconConfig,
    clearCache,
    loadRemoteIcon,
    loadLocalIcon,
    loadIconByName
  }
})
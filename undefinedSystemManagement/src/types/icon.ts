/**
 * 图标组件属性类型定义
 */
export interface IconProps {
    /** 图标名称，用于从配置中查找 */
    name?: string
    /** 图标大小，默认 '1em' */
    size?: string | number
    /** 图标颜色，默认 'currentColor' */
    color?: string
    /** 图标前缀，用于区分不同的图标集 */
    prefix?: string
    /** 本地图标路径 */
    localPath?: string
    /** 远程图标URL */
    remoteUrl?: string
    /** 图标宽度 */
    width?: string | number
    /** 图标高度 */
    height?: string | number
    /** 是否旋转动画 */
    spin?: boolean
    /** 旋转角度（度） */
    rotate?: number
    /** 翻转方向：'none' | 'horizontal' | 'vertical' | 'both' */
    flip?: 'none' | 'horizontal' | 'vertical' | 'both'
  }
  
  /**
   * 图标配置项
   */
  export interface IconConfig {
    /** 图标名称 */
    name: string
    /** 图标路径或URL */
    path: string
    /** 图标前缀 */
    prefix?: string
  }
  
  /**
   * 图标加载器配置
   */
  export interface IconLoaderConfig {
    /** 默认图标前缀 */
    defaultPrefix?: string
    /** 图标配置列表 */
    icons?: IconConfig[]
    /** 图标基础路径 */
    basePath?: string
    /** 是否启用缓存 */
    enableCache?: boolean
    /** 缓存过期时间（毫秒） */
    cacheExpiry?: number
  }
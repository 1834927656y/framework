import { createI18n } from 'vue-i18n'
import zhCN from '@/language/zh-CN'
import en from '@/language/en'

const i18n = createI18n({
  legacy: false,
  locale: 'zhCN',
  fallbackLocale: 'en',  
  messages: {
    zhCN,
    en
  }
})

// ✅ 已请求过的 key 缓存（确保每个 key 只请求一次）
const requestedKeys = new Set<string>()
// ✅ 翻译中的缓存，防止重复请求
const translatingKeys = new Set<string>()

const english = (key: string) => {
  // 如果不包含中文，直接返回（已经是英文）
  if (!/[\u4e00-\u9fa5]/.test(key)) {
    return Promise.resolve(key)
  }
  
  // 包含中文，需要翻译成英文
  return fetch(import.meta.env.VITE_TRANSLATE_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: key, from: 'auto', to: 'en' })
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    return res.json()
  })
  .then(data => {
    // ⚠️ 关键修复：从响应中提取翻译文本
    // 响应格式: {"from":"zh","to":"en","trans_result":[{"src":"用户名称","dst":"Username"}]}
    if (data.trans_result && Array.isArray(data.trans_result) && data.trans_result.length > 0) {
      const translatedText = data.trans_result[0].dst
      // console.log('✅ [english] 翻译成功:', key, '->', translatedText)
      return translatedText  // ✅ 返回提取的文本，而不是整个对象
    }
    // console.warn('⚠️ [english] 响应格式异常:', data)
    return key
  })
  .catch(error => {
    // console.error('❌ [english] 翻译请求失败:', error)
    return key
  })
}

const chinese = (key: string) => {
  // 如果已经包含中文，直接返回（不需要翻译）
  if (/[\u4e00-\u9fa5]/.test(key)) {
    return Promise.resolve(key)
  }
  
  // 不包含中文，需要翻译成中文
  return fetch(import.meta.env.VITE_TRANSLATE_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: key, from: 'auto', to: 'zh' })
  })
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    return res.json()
  })
  .then(data => {
    // ⚠️ 关键修复：从响应中提取翻译文本
    // 响应格式: {"from":"en","to":"zh","trans_result":[{"src":"Username","dst":"用户名称"}]}
    if (data.trans_result && Array.isArray(data.trans_result) && data.trans_result.length > 0) {
      const translatedText = data.trans_result[0].dst
      // console.log('✅ [chinese] 翻译成功:', key, '->', translatedText)
      return translatedText  // ✅ 返回提取的文本，而不是整个对象
    }
    console.warn('⚠️ [chinese] 响应格式异常:', data)
    return key
  })
  .catch(error => {
    console.error('❌ [chinese] 翻译请求失败:', error)
    return key
  })
}

const i18nts = i18n.global as typeof i18n.global & {
  ts: (key: string, fallback?: string) => string
}

// 判断是否需要翻译
const needsTranslation = (key: string, targetLocale: string): boolean => {
  const hasChinese = /[\u4e00-\u9fa5]/.test(key)
  
  if (targetLocale === 'zhCN') {
    // 目标语言是中文，如果 key 已经是中文，不需要翻译
    return !hasChinese
  } else {
    // 目标语言是英文，如果 key 是中文，需要翻译
    return hasChinese
  }
}

const translateAsync = async (key: string) => {
  const targetLocale = i18n.global.locale.value
  
  // ⚠️ 关键修复：判断是否需要翻译
  if (!needsTranslation(key, targetLocale)) {
    // console.log('🔵 [translateAsync] 不需要翻译，直接返回:', key)
    // 不需要翻译时，不标记为已请求，允许后续真正需要时再翻译
    return key
  }
  
  // 需要翻译，调用相应的翻译函数
  const result = targetLocale === 'zhCN'
    ? await chinese(key)
    : await english(key)
  
  // ⚠️ 关键修复：只有在真正发送了请求后才标记为已请求
  // 如果 result === key，说明翻译失败或不需要翻译，不标记
  if (result !== key) {
    if (!requestedKeys.has(key)) {
      requestedKeys.add(key)
      // console.log('📝 [translateAsync] 标记为已请求:', key)
    }
  } else {
    // console.log('🟡 [translateAsync] 翻译结果与原始 key 相同，不标记为已请求:', key)
  }
  
  return result
}

const mergeTranslatedMessage = (locale: string, key: string, value: string) => {
  // ⚠️ 关键：确保 value 是字符串
  if (typeof value !== 'string') {
    console.error('❌ [mergeTranslatedMessage] value 不是字符串:', { 
      key, 
      value, 
      type: typeof value,
      valueStr: JSON.stringify(value)
    })
    return  // 不保存非字符串的值
  }
  
  const segments = key.split('.')
  const last = segments.pop()
  if (!last) return
  const localeMessage = { ...i18n.global.getLocaleMessage(locale) }
  let cursor: Record<string, any> = localeMessage

  segments.forEach(segment => {
    cursor[segment] = cursor[segment] ?? {}
    cursor = cursor[segment]
  })

  cursor[last] = value
  // console.log('✅ [mergeTranslatedMessage] 保存翻译:', { key, value, locale })
  i18n.global.setLocaleMessage(locale, localeMessage)
}

i18nts.ts = (key: string) => {
  // 如果翻译已存在，直接返回
  if (i18nts.te(key)) {
    const translated = i18nts.t(key)
    // ⚠️ 关键：确保返回的是字符串
    if (typeof translated === 'string') {
      return translated
    }
    // 如果保存的不是字符串（说明之前保存错误），清除并重新翻译
    console.warn('⚠️ [ts] 翻译值不是字符串，清除并重新翻译:', { key, translated })
    const segments = key.split('.')
    const last = segments.pop()
    if (last) {
      const localeMessage = { ...i18n.global.getLocaleMessage(i18n.global.locale.value) }
      let cursor: Record<string, any> = localeMessage
      segments.forEach(segment => {
        cursor = cursor[segment] || {}
      })
      delete cursor[last]
      i18n.global.setLocaleMessage(i18n.global.locale.value, localeMessage)
      // 清除已请求标记，允许重新请求
      requestedKeys.delete(key)
    }
  }
  
  // ⚠️ 关键修复：检查是否需要翻译
  const targetLocale = i18n.global.locale.value
  if (!needsTranslation(key, targetLocale)) {
    // 不需要翻译，直接返回原始 key
    // console.log('🔵 [ts] 不需要翻译，直接返回:', key)
    return key
  }
  
  // ⚠️ 关键：如果已经请求过（无论成功失败），不再请求
  if (requestedKeys.has(key)) {
    // console.log('🟡 [ts] 已请求过，返回原始 key:', key)
    return key
  }
  
  // 如果正在翻译中，不重复触发
  if (translatingKeys.has(key)) {
    // console.log('🟡 [ts] 正在翻译中，返回原始 key:', key)
    return key
  }
  
  // 标记为翻译中
  translatingKeys.add(key)
  // console.log('🟢 [ts] 开始翻译流程:', key)
  
  // 触发异步翻译
  translateAsync(key)
    .then(translated => {
      // console.log('📥 [ts] 收到翻译结果:', { key, translated, type: typeof translated })
      // ⚠️ 关键：确保 translated 是字符串
      if (typeof translated === 'string' && translated !== key) {
        mergeTranslatedMessage(i18n.global.locale.value, key, translated)
      } else {
        console.warn('⚠️ [ts] 翻译结果无效:', { key, translated, type: typeof translated })
      }
    })
    .catch(error => {
      console.error('❌ [ts] 翻译失败:', error)
    })
    .finally(() => {
      // 翻译完成，移除翻译中标记
      translatingKeys.delete(key)
      // console.log('🏁 [ts] 翻译流程完成:', key)
    })
  
  return key  // 同步返回原始 key
}

export default i18n
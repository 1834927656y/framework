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

// ✅ 添加翻译中的缓存，防止重复请求
const translatingKeys = new Set<string>()

const english = (key: string) => {
  return !/[\u4e00-\u9fa5]/.test(key)
  ? Promise.resolve(key)
  : fetch('http://localhost:3000/translate', {
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
    .then(res => {
      if (res.error_code) {
        console.error('百度翻译 API 错误:', res.error_code, res.error_msg)
        return key
      }
      if (res.message) {
        console.error('服务器错误:', res.message)
        return key
      }
      if (res.trans_result && Array.isArray(res.trans_result) && res.trans_result.length > 0 && res.trans_result[0].dst) {
        return res.trans_result[0].dst
      } else {
        console.error('翻译接口返回格式错误:', res)
        return key
      }
    })
    .catch(error => {
      console.error('翻译请求失败:', error)
      return key
    })
}

const chinese = (key: string) => {
  return /[\u4e00-\u9fa5]/.test(key)
  ? Promise.resolve(key)
  : fetch('http://localhost:3000/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: key, from: 'auto', to: 'zhCN' })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      return res.json()
    })
    .then(res => {
      if (res.error_code) {
        console.error('百度翻译 API 错误:', res.error_code, res.error_msg)
        return key
      }
      if (res.message) {
        console.error('服务器错误:', res.message)
        return key
      }
      if (res.trans_result && Array.isArray(res.trans_result) && res.trans_result.length > 0 && res.trans_result[0].dst) {
        return res.trans_result[0].dst
      } else {
        console.error('翻译接口返回格式错误:', res)
        return key
      }
    })
    .catch(error => {
      console.error('翻译请求失败:', error)
      return key
    })
}

const i18nts = i18n.global as typeof i18n.global & {
  ts: (key: string, fallback?: string) => string
}

const translateAsync = async (key: string) => {
  return i18n.global.locale.value === 'zhCN'
    ? await chinese(key)
    : await english(key)
}

const mergeTranslatedMessage = (locale: string, key: string, value: string) => {
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
  i18n.global.setLocaleMessage(locale, localeMessage)
}

i18nts.ts = (key: string) => {
  // ✅ 如果翻译已存在，直接返回
  if (i18nts.te(key)) {
    return i18nts.t(key)
  }
  
  // ✅ 如果正在翻译中，不重复触发
  if (translatingKeys.has(key)) {
    return key
  }
  
  // ✅ 标记为翻译中
  translatingKeys.add(key)
  
  // 触发异步翻译
  translateAsync(key)
    .then(translated => {
      mergeTranslatedMessage(i18n.global.locale.value, key, translated)
    })
    .catch(error => {
      console.error('翻译失败:', error)
    })
    .finally(() => {
      // ✅ 翻译完成，移除标记
      translatingKeys.delete(key)
    })
  
  return key  // 同步返回原始 key
}

export default i18n
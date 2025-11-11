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

const english = (key: string) => {
  return !/[\u4e00-\u9fa5]/.test(key)
  ? Promise.resolve(key)
  :fetch('http://localhost:3000/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: key, from: 'auto', to: 'en' })
  }).then(res => res.json()).then(res => res.trans_result[0].dst)
}
const chinese = ( key: string) => {
  return /[\u4e00-\u9fa5]/.test(key)
  ? Promise.resolve(key)
  : fetch('http://localhost:3000/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: key, from: 'auto', to: 'zhCN' })
    }).then(res => res.json()).then(res => res.trans_result[0].dst)
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
  const result = i18nts.te(key) ? i18nts.t(key) : key  // 同步返回
  if (!i18nts.te(key)) {
    translateAsync(key).then(translated => {
      mergeTranslatedMessage(i18n.global.locale.value, key, translated)
    })
  }
  return result
}

export default i18n
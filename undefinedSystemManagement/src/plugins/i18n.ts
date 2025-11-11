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
  !/[\u4e00-\u9fa5]/.test(key)
  ? Promise.resolve('')
  :fetch('http://localhost:3000/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: key, from: 'auto', to: 'en' })
  }).then(res => res.json()).then(res => res.trans_result[0].dst)
}
const chinese = ( key: string) => {
  /[\u4e00-\u9fa5]/.test(key)
  ? Promise.resolve('')
  : fetch('http://localhost:3000/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: key, from: 'auto', to: 'zhCN' })
    }).then(res => res.json()).then(res => res.trans_result[0].dst)
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

const composer = i18n.global as typeof i18n.global & {
  ts: (key: string) => Promise<string>
}

composer.ts = async (key: string) => {
  if (composer.te(key)) {
    return composer.t(key)
  }

  const locale = composer.locale.value
  const translated =
    locale === 'zhCN'
      ? await chinese(key)
      : await english(key)

  console.log(translated);
  

  // mergeTranslatedMessage(locale, key, translated)

  return composer.t(key)
}

export default i18n
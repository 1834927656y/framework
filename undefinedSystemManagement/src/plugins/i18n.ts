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

export default i18n
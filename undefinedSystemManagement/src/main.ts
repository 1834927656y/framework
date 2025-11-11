import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import i18n from '@/plugins/i18n'
import '@/router/permission'
import ElementIcons from '@/plugins/svgicon'
import addAutoCompoment from '@/plugins/addAutoCompoment'

const app = createApp(App)



app.use(router)
app.use(store)
app.use(ElementIcons)
app.use(addAutoCompoment)
app.use(i18n)
app.config.globalProperties.$ts = i18n.global.ts

app.mount('#app')
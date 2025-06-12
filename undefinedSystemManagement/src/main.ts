import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/router/permission'
import ElementIcons from '@/plugins/svgicon'
import addAutoCompoment from '@/plugins/addAutoCompoment'

const app = createApp(App)



app.use(router)
app.use(store)
app.use(ElementIcons)
app.use(addAutoCompoment)
console.log(Object.keys(app._context.components));
app.mount('#app')
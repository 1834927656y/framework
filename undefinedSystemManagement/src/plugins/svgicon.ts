import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import type { App } from 'vue';

export default {
  install: (app: App) => {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  }
};

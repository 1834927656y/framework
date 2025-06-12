// 自动注册view文件下所有vabAutoComponents文件中以.vue为后缀的文件为组件
// 组件名称为view下一级文件名加上组件名（组件名首写字母大写）
import type { App } from 'vue';
export default {
  install(app: App) {
    const components = import.meta.glob('@/views/**/vabAutoComponents/**/*.vue');
    Object.keys(components).forEach((key) => {
      const matches = key.split('/');
      if (matches) {
        let componentName = ''
        matches.forEach((item, index) => {
          if (index > matches.indexOf('views') && index < matches.indexOf('vabAutoComponents')) {
            componentName +=  item.charAt(0).toUpperCase() + item.slice(1)
          }
        });
        componentName += matches[matches.length - 1].replace('.vue', '').charAt(0).toUpperCase() + matches[matches.length - 1].replace('.vue', '').slice(1)
        const AsyncComponent = defineAsyncComponent(() => components[key]());
        app.component(componentName, AsyncComponent);
        }
    },);
  }
}

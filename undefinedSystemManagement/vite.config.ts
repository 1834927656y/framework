import { defineConfig, loadEnv } from 'vite'
import type { UserConfig, ConfigEnv } from 'vite'
import createVitePlugins from './vite/plugins'
import path from 'path'


export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_BASE_URL,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    plugins: [createVitePlugins(env, command === 'build')],
    // 预编译
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        'pinia',
        'axios',
        '@vueuse/core',
        'echarts',
        'vue-i18n',
        '@vueup/vue-quill',
        'bpmn-js/lib/Viewer',
        'bpmn-js/lib/Modeler.js',
        'bpmn-js-properties-panel',
        'min-dash',
        'diagram-js/lib/navigation/movecanvas',
        'diagram-js/lib/navigation/zoomscroll',
        'bpmn-js/lib/features/palette/PaletteProvider',
        'bpmn-js/lib/features/context-pad/ContextPadProvider',
        'diagram-js/lib/draw/BaseRenderer',
        'tiny-svg',
        'image-conversion',
        'element-plus/es/components/**/css'
      ]
    },
  }
})

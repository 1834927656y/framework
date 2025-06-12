import vue from '@vitejs/plugin-vue'
import Unocss from './unocss'
import AutoImport from './auto-import'
import Components from './components'
import Compression from './compression'
import I18n from './i8n'
import Icons from './icons'
import path from 'path'

export default function createVitePlugins(viteEnv: any, isBuild = false) {
  const vitePlugins: any[]= []
  vitePlugins.push(vue())
  vitePlugins.push(Unocss())
  vitePlugins.push(AutoImport(path))
  vitePlugins.push(Components(path))
  vitePlugins.push(Compression(viteEnv))
  vitePlugins.push(I18n(path))
  vitePlugins.push(Icons())
  return vitePlugins
}
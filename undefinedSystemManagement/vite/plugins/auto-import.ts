import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

export default (path: any) => {
  return AutoImport({
    imports: [
      'vue', 
      'vue-router',
      'pinia',
      '@vueuse/core',
      {
        'gsap': [
          'gsap',
          'TimelineMax',
          'TweenMax',
          'TweenLite',
          'Power1',
          'Power2',
          'Power3',
          'Power4',
          'Back',
          'Elastic',
          'Bounce',
          'RoughEase',
          'SlowMo',
          'SteppedEase',
          'Circ',
          'Expo',
          'Sine'
        ]
      }
    ],
    resolvers: [
        ElementPlusResolver(),
        IconsResolver({
           prefix: 'Icon'
        })
    ],
    eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
    },
    vueTemplate: true,
    dts: path.resolve(__dirname, '../../src/types/auto-imports.d.ts')
  })
}
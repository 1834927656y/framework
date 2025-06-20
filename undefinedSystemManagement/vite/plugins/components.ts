import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

export default (path: any) => {
    return Components({
        resolvers: [
            ElementPlusResolver(),
            IconsResolver({
                enabledCollections: ['eq']
            })
        ],
        dts: path.resolve(path.resolve(__dirname, '../../src'), 'types', 'components.d.ts')
    })
}
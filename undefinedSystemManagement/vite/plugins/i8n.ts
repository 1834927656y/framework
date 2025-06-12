import I18n from '@intlify/unplugin-vue-i18n/vite'

export default (path: any) => {
    return I18n({
        include: [path.resolve(__dirname, '../../src/language/**')],
        // 其他配置保持不变
    })
}
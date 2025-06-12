export const useTagesViewStore = defineStore('tagesView',() => {
    const tagesViewArray = ref([])//标签导航数组
    const noCacheView = ref([])//缓存页面名称数组
    const addTagesView = (value: any) => {
        tagesViewArray.value = value
    }
    const addNoCacheTagesView = (value: any) => {
        noCacheView.value = value
    }
    return {
        tagesViewArray,
        noCacheView,
        addTagesView,
        addNoCacheTagesView
    }
})
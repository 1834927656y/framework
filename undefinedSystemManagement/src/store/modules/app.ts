export const useAppStore = defineStore('app',() => {
  const sidebar = ref({
    exist: false,
    expand: true,
    foldingWidth: '64px',
    expansionWidth: '200px',
  })
  const navBar = ref({
    exist: true,
    height: '50px',
  })
  const tagsView = ref({
    height: '30px',
  })

  const setSidebar = (value: any) => {
    sidebar.value = value
  }
  const setNavBar = (value: any) => {
    navBar.value = value
  }
  const setTagsView = (value: any) => {
    tagsView.value = value
  }


  return {
    sidebar,
    navBar,
    tagsView,
    setSidebar,
    setNavBar,
    setTagsView,
  }
})
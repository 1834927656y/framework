import NProgress from 'nprogress'
import router from './index'
import { getToken } from '@/utils/auth'
NProgress.configure({
    showSpinner: true,
})

const whiteList = ['/login','/my/Application','/my/index','/my/Account','/myGsapStudy/unit1','/myGsapStudy/unit2']
router.beforeEach(async (to, from, next) => {
    NProgress.start()
    if(getToken()){
        console.log('存在token');
        
        if(to.path === '/login'){
            next({path: '/'})
          
        }
        else{
            next()
           
        }
    }
    else if(whiteList.indexOf(to.path as string) !== -1){
        console.log('白名单');
        next()
        
    }
    else{
        next(`/my/Application?redirect=${to.path}`)
       
    }
})

router.afterEach(() => {
    NProgress.done()
})

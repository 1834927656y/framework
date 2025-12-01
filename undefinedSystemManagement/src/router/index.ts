import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

// 路由配置项说明：
// {
//     path: '/path',                    // 路由路径
//     component: Component,             // 组件
//     hidden: true/false,              // 是否在侧边栏隐藏
//     alwaysShow: true/false,          // 是否总是显示根路由
//     redirect: 'noRedirect',          // 重定向配置
//     name: 'router-name',             // 路由名称
//     meta: {
//       title: 'title',                // 菜单标题
//       icon: 'svg-name',              // 图标
//       noCache: true/false,           // 是否缓存
//       breadcrumb: true/false,        // 是否显示面包屑
//       activeMenu: '/path',           // 激活菜单
//       permissions: ['a:a:a'],        // 权限标识
//       roles: ['admin']               // 角色标识
//       Watermark: true/false,         // 是否显示水印
//     }
//   }
export const constantRoutes : RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login.vue')
    },
    {
        path: '',
        component: () => import('@/views/index.vue')
    },
    {
        path: '/my',
        component: Layout,
        hidden: true,
        permissions: ['system:user:edit'],
        children: [
          {
            path: 'Application',
            component: () => import('@/views/myApplication/index.vue'),
            name: 'Application',
            meta: { title: '我的应用',Watermark: false }
          },
          {
            path: 'index',
            component: () => import('@/views/index.vue'),
            name: 'index',
            meta: { title: '首页',Watermark: false }
          },
          {
            path: 'Account',
            component: () => import('@/views/myAccount/index.vue'),
            name: 'Account',
            meta: { title: '我的账户',Watermark: false }
          }
        ]
    },
    {
      path: '/myGsapStudy',
      component: Layout,
      hidden: true,
      children: [
        {
          path: 'unit1',
          component: () => import('@/views/myGsapStudy/unit1/index.vue'),
          name: 'unit1',
          meta: { title: 'GSAP学习',Watermark: false }
        }
      ]
    },
    {
      path: '/myGsapStudy',
      component: Layout,
      hidden: true,
      children: [
        {
          path: 'unit2',
          component: () => import('@/views/myGsapStudy/unit2/index.vue'),
          name: 'unit2',
          meta: { title: 'GSAP学习',Watermark: false }
        }
      ]
    }
]

export const dynamicRoutes : RouteRecordRaw[] = [
    
]


   

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes: constantRoutes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition;
        } else {
          return { top: 0,left: 0 };
        }
      }
})

export default router
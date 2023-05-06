import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/info',
    component: Layout,
    redirect: '/info/buy',
    meta: {
      title: '发布信息管理',
      icon: 'form'
    },
    children: [
      {
        path: 'sell',
        name: 'sell',
        component: () => import('@/views/info/sell'),
        meta: { title: '出售商品' }
      },
      {
        path: 'buy',
        name: 'buy',
        component: () => import('@/views/info/buy'),
        meta: { title: '采购需求' }
      },
      {
        path: 'activity',
        name: 'activity',
        component: () => import('@/views/info/activity'),
        meta: { title: '校园活动' }
      },
      {
        path: 'complaints',
        name: 'complaints',
        component: () => import('@/views/info/complaints'),
        meta: { title: '校园吐槽' }
      }
    ]
  },
  /*
  {
    path: '/swiper',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/swiper/index'),
        meta: { title: '轮播图管理', icon: 'link' }
      }
    ]
  },*/

  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'user',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'user' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

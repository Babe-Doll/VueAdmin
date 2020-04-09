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
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed 必然加载
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        // 这里的*是去匹配0或多个路由
        //如果不加*只能匹配到如/redirect/category  加*匹配/redirect/category/create
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',//重定向到dashboard
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  } 
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 * 根据用户定义
 * 
 * △:注意 菜单栏下只有一个可以访问的话 只显示父节点
 */
export const asyncRoutes = [
  {
    path: '/system',
    name: 'system',//加入name才有面包屑导航
    component: Layout,//对应的组件
    redirect: '/category/create',//重定向
    meta: { title: '系统管理', icon: 'documentation', roles: ['admin'] },
    children: [
      {
        name: 'bloglist',
        path: '/blog/list',
        component: () => import('../views/blog/list.vue'),
        meta: { title: '博客管理', icon: 'list' }
      },
      {
        name: 'categorycreate',
        path: '/category/create',
        component: () => import('../views/category/create.vue'),
        meta: { title: '新增分类', icon: 'edit', roles: ['admin'] },

      },
      // {
      //   name: 'categoryedit',
      //   path: '/category/edit',
      //   hidden:true,
      //   component: () => import('../views/category/edit.vue'),
      //   meta: { title: '编辑分类', icon: 'edit', roles: ['admin'], activeMenu: '/category/list' },

      // },
      {
        name: 'categorylist',
        path: '/category/list',
        component: () => import('../views/category/list.vue'),
        meta: { title: '分类管理', icon: 'list' }
      },
      {
        name: 'taglist',
        path: '/tag/list',
        component: () => import('../views/tag/list.vue'),
        meta: { title: '标签管理', icon: 'list' }
      },
      {
        name: 'rolelist',
        path: '/role/list',
        component: () => import('../views/role/list.vue'),
        meta: { title: '角色管理', icon: 'list' }
      },
      {
        name: 'userlist',
        path: '/user/list',
        component: () => import('../views/user/list.vue'),
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
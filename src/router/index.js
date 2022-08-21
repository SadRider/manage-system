import { createRouter, createWebHistory } from 'vue-router'
import { routesLoadStore } from '../store/routesLoad'
const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/index.vue'),
    children: [{
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        title: '系统首页',
        icon: 'HomeFilled'
      },
      component: () => import('../views/dashboard/index.vue')
    },
    {
      path: '/table',
      name: 'table',
      meta: {
        title: '基础表格',
        icon: 'Grid'
      },
      component: () => import('../views/baseTable/index.vue')
    }, {
      path: '/message',
      name: 'message',
      meta: {
        title: '消息列表',
        icon: 'Message'
      },
      component: () => import('../views/message/index.vue')
    }]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // 网页标题更改
  document.title = `${to.meta.title} | 后台管理系统`
  // 路由是否加载标记
  const isRoutesLoad = routesLoadStore()
  // 获取路由
  const routesList = JSON.parse(localStorage.getItem('ms_routes'))
  const notFoundPage = JSON.parse(localStorage.getItem('404'))
  // 模拟登录
  const role = localStorage.getItem('ms_username')
  // 如果用户登录了(role===true,在这里只是简单模拟)
  if (role) {
    // 如果路由表已注册,直接跳转前往页
    // 否则注册路由,并重定向
    if (isRoutesLoad.routesLoadMark) {
      next()
    } else {
      isRoutesLoad.setRoutesLoadMark(true)
      if (JSON.stringify(routesList) !== '[]') {
        for (const item of routesList) {
          const element = {
            path: item.path,
            name: item.name,
            meta: item.meta,
            component: () => import(`../views/${item.component}`)
          }
          router.addRoute('Home', element)
          router.options.routes[2].children.push(element)
        }
      }
      const notFoundEl = {
        path: notFoundPage[0].path,
        name: notFoundPage[0].name,
        component: () => import(`../views/${notFoundPage[0].component}`)
      }
      router.addRoute(notFoundEl)
      console.log(notFoundPage)
      router.options.routes.push(notFoundEl)
      next({ ...to, replace: true })
    }
    // 如果未登录且前往非登录页,则清空路由表并跳转登录页重新获取路由表
  } else if (!role && to.path !== '/login') {
    isRoutesLoad.setRoutesLoadMark(false)
    localStorage.setItem('ms_routes', JSON.stringify([]))
    next('/login')
  } else {
    next()
  }
})

export default router

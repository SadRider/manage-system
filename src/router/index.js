import { createRouter, createWebHashHistory } from 'vue-router'
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
    component: () => import('../views/home/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // 网页标题更改
  document.title = `${to.meta.title} | 后台管理系统`
  // 路由是否加载标记
  const isRoutesLoad = routesLoadStore()
  // 获取路由
  const routesList = JSON.parse(localStorage.getItem('ms_routes'))
  // 模拟登录
  const role = localStorage.getItem('ms_username')
  // 如果用户登录了(role===true,在这里只是简单模拟)且路由列表不为空
  if (role && JSON.stringify(routesList) !== '[]') {
    // 如果路由表已注册,直接跳转前往页
    // 否则注册路由,并重定向
    if (isRoutesLoad.routesLoadMark) {
      next()
    } else {
      isRoutesLoad.setRoutesLoadMark(true)
      for (const item of routesList) {
        router.addRoute('Home', {
          path: item.path,
          name: item.name,
          meta: item.meta,
          component: () => import(`../views/${item.component}`)
        })
      }
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

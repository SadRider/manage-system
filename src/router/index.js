import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/home/index.vue'),
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: '系统首页'
                },
                component: () => import('../views/dashboard/index.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: '登录',
        },
        component: () => import('../views/login/index.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    //网页标题更改
    document.title = `${to.meta.title} | 后台管理系统`
    // 模拟登录
    const role = localStorage.getItem('ms_username')
    if (!role && to.path !== '/login') {
        next('/login')
    } else {
        next()
    }
})

export default router
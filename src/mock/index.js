import Mock from 'mockjs'

Mock.mock('/api/userLogin', 'post', {
  code: 0,
  success: true,
  message: '登录成功',
  data: {
    router: [
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: '系统首页',
          icon: 'HomeFilled'
        },
        component: 'dashboard/index.vue'
      }
    ]
  }
})
Mock.setup({
  timeout: 400
})

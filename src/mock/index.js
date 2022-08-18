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
      },
      {
        path: '/table',
        name: 'table',
        meta: {
          title: '基础表格',
          icon: 'HomeFilled'
        },
        component: 'baseTable/index.vue'
      }
    ]
  }
})
Mock.mock('/api/getTodoList', 'post', {
  code: 0,
  success: true,
  message: '登录成功',
  data: {
    todoList: [
      {
        title: '今天要修复100个bug',
        status: false
      },
      {
        title: '今天要修复100个bug',
        status: false
      },
      {
        title: '今天要写100行代码加几个bug吧',
        status: false
      },
      {
        title: '今天要修复100个bug',
        status: false
      },
      {
        title: '今天要修复100个bug',
        status: true
      },
      {
        title: '今天要写100行代码加几个bug吧',
        status: true
      }
    ]
  }
})
Mock.mock('/api/getCharts', 'get', {
  code: 0,
  success: true,
  message: '登录成功',
  data: {
    charts: [
      {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'bar',
            data: [320, 332, 301, 334, 390, 300, 300]
          },
          {
            type: 'bar',
            data: [220, 182, 191, 234, 290, 250, 250]
          },
          {
            type: 'bar',
            data: [150, 232, 201, 154, 190, 150, 150]
          },
          {
            type: 'bar',
            data: [98, 77, 101, 99, 40, 100, 100]
          }
        ]
      },
      {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'line',
            data: [320, 332, 301, 334, 390, 300, 300]
          },
          {
            type: 'line',
            data: [220, 182, 191, 234, 290, 250, 250]
          },
          {
            type: 'line',
            data: [150, 232, 201, 154, 190, 150, 150]
          },
          {
            type: 'line',
            data: [98, 77, 101, 99, 40, 100, 100]
          }
        ]
      }
    ]
  }
})
Mock.setup({
  timeout: 400
})

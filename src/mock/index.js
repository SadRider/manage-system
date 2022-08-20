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
          icon: 'Grid'
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
Mock.mock('/api/getTableData', 'post', {
  code: 0,
  success: true,
  message: '登录成功',
  data: {
    list: [{
      id: 1,
      name: '张三',
      money: 123,
      address: '广东省东莞市长安镇',
      state: '成功',
      date: '2019-11-1'
    },
    {
      id: 2,
      name: '李四',
      money: 456,
      address: '广东省广州市白云区',
      state: '成功',
      date: '2019-10-11'
    },
    {
      id: 3,
      name: '王五',
      money: 789,
      address: '湖南省长沙市',
      state: '失败',
      date: '2019-11-11'
    },
    {
      id: 4,
      name: '赵六',
      money: 1011,
      address: '福建省厦门市鼓浪屿',
      state: '成功',
      date: '2019-10-20'
    }
    ],
    pageTotal: 4
  }
})
Mock.setup({
  timeout: 400
})

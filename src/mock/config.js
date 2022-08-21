// todolist
export const todoList = [
  {
    id: 1,
    title: '今天要修复100个bug',
    status: false
  },
  {
    id: 2,
    title: '今天要修复100个bug',
    status: false
  },
  {
    id: 3,
    title: '今天要写100行代码加几个bug吧',
    status: false
  },
  {
    id: 4,
    title: '今天要修复100个bug',
    status: false
  },
  {
    id: 5,
    title: '今天要修复100个bug',
    status: true
  },
  {
    id: 6,
    title: '今天要写100行代码加几个bug吧',
    status: true
  }
]

// charts
export const chartsList = [
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

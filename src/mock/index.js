// 存放mock接口,既模拟接口,可以拦截请求并返回模拟数据

import Mock from 'mockjs'
import { todoList, chartsList } from './config'
const Random = Mock.Random
// 登录接口
Mock.mock('/api/userLogin', 'post', params => {
  const body = JSON.parse(params.body)
  if (body.username === 'admin') {
    if (body.password === '123456') {
      return {
        code: 0,
        success: true,
        message: '登录成功',
        data: {
          router: [{
            path: '/adminAuth',
            name: 'adminAuth',
            meta: {
              title: '权限控制',
              icon: 'Lock'
            },
            component: 'adminAuth/index.vue'
          }],
          notFound: [
            {
              path: '/:catchAll(.*)',
              name: '404',
              component: '404/index.vue'
            }]
        }
      }
    } else {
      return {
        code: 1,
        success: false,
        message: '登录失败',
        data: {
          router: [],
          notFound: []
        }
      }
    }
  } else {
    return {
      code: 0,
      success: true,
      message: '登录成功',
      data: {
        router: [],
        notFound: [
          {
            path: '/:catchAll(.*)',
            name: '404',
            component: '404/index.vue'
          }]
      }
    }
  }
})
// 获取代办列表
Mock.mock('/api/getTodoList', 'post', {
  code: 0,
  success: true,
  message: '获取成功',
  data: {
    todoList
  }
})
// 获取统计图
Mock.mock('/api/getCharts', 'get', {
  code: 0,
  success: true,
  message: '获取成功',
  data: {
    charts: chartsList
  }
})

// 生成表格数据
const tableList = []
for (let i = 0; i < 100; i++) {
  tableList.push({
    id: Random.id(),
    name: Random.cname(),
    money: Random.integer(100, 10000),
    address: Random.county(true),
    state: Random.boolean(),
    date: Random.date('yyyy-MM-dd')
  })
}
// 获取表格的数据
Mock.mock('/api/getTableData', 'post', param => {
  const body = JSON.parse(param.body)
  const { address, name, pageIndex, pageSize } = body
  const newList = tableList.filter((item) => {
    if (address && name) {
      if (item.address.indexOf(address) !== -1 && item.name.indexOf(name) !== -1) {
        return item
      }
    } else if (address) {
      if (item.address.indexOf(address) !== -1) {
        return item
      }
    } else if (name) {
      if (item.name.indexOf(name) !== -1) {
        return item
      }
    } else {
      return item
    }
  })
  const total = newList.length
  const list = newList.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
  return {
    code: 0,
    success: true,
    message: '获取成功',
    data: {
      tableList: list,
      total
    }
  }
})
// 删除表格数据
Mock.mock('/api/delTableData', 'post', param => {
  const body = JSON.parse(param.body)
  const index = tableList.findIndex(item => {
    return item.id === body.id
  })
  tableList.splice(index, 1)
  return {
    code: 0,
    success: true,
    message: '删除成功'
  }
})
// 编辑表格数据
Mock.mock('/api/updateTableData', 'post', param => {
  const body = JSON.parse(param.body)
  const index = tableList.findIndex(item => {
    return item.id === body.id
  })
  Object.keys(body).forEach(item => {
    tableList[index][item] = body[item]
  })
  return {
    code: 0,
    success: true,
    message: '修改成功'
  }
})
// 表单提交
Mock.mock('/api/submitForm', 'post', param => {
  const body = JSON.parse(param.body)
  const date = new Date()
  const now = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  const data = body
  data.id = Random.id()
  data.date = now
  tableList.unshift(data)
  return {
    code: 0,
    success: true,
    message: '修改成功'
  }
})
// =================消息列表===========================
const messageList = {
  unread: [],
  read: [],
  recycle: []
}
for (let i = 0; i < 10; i++) {
  messageList.unread.push({
    id: Random.id(),
    title: Random.csentence(5, 30),
    date: Random.datetime('yyyy-MM-dd HH:mm:ss')
  })
  messageList.read.push({
    id: Random.id(),
    title: Random.csentence(5, 30),
    date: Random.datetime('yyyy-MM-dd HH:mm:ss')
  })
  messageList.recycle.push({
    id: Random.id(),
    title: Random.csentence(5, 30),
    date: Random.datetime('yyyy-MM-dd HH:mm:ss')
  })
}
Mock.mock('/api/getMessageList', 'get', {
  code: 0,
  success: true,
  message: '获取消息列表成功',
  data: {
    messageList
  }
})
Mock.mock('/api/readMessage', 'post', param => {
  const body = JSON.parse(param.body)
  const index = messageList.unread.findIndex(item => {
    return item.id === body.id
  })
  const el = messageList.unread.splice(index, 1)
  messageList.read.push(...el)
  return {
    code: 0,
    success: true,
    message: '修改成功'
  }
})

Mock.mock('/api/readAllMessage', 'get', () => {
  const list = messageList.unread
  messageList.read.push(...list)
  messageList.unread = []
  return {
    code: 0,
    success: true,
    message: '修改成功'
  }
})

Mock.mock('/api/delMessage', 'post', param => {
  const body = JSON.parse(param.body)
  const index = messageList.read.findIndex(item => {
    return item.id === body.id
  })
  const el = messageList.read.splice(index, 1)
  messageList.recycle.push(...el)
  return {
    code: 0,
    success: true,
    message: '删除成功'
  }
})

Mock.mock('/api/delAllMessage', 'get', () => {
  const list = messageList.read
  messageList.recycle.push(...list)
  messageList.read = []
  return {
    code: 0,
    success: true,
    message: '删除成功'
  }
})
Mock.setup({
  timeout: 400
})

Mock.mock('/api/returnMessage', 'post', param => {
  const body = JSON.parse(param.body)
  const index = messageList.recycle.findIndex(item => {
    return item.id === body.id
  })
  const el = messageList.recycle.splice(index, 1)
  messageList.read.push(...el)
  return {
    code: 0,
    success: true,
    message: '还原成功'
  }
})

Mock.mock('/api/returnAllMessage', 'get', () => {
  const list = messageList.recycle
  messageList.read.push(...list)
  messageList.recycle = []
  return {
    code: 0,
    success: true,
    message: '还原成功'
  }
})

Mock.mock('/api/clearAllMessage', 'get', () => {
  messageList.recycle = []
  return {
    code: 0,
    success: true,
    message: '清空成功'
  }
})
// =====================================================
Mock.setup({
  timeout: 400
})

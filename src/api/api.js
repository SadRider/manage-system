import request from '@/utils/request'

export const userLogin = (data) => {
  return request('/api/userLogin', 'post', data)
}

export const getTodoListByUsername = (data) => {
  return request('/api/getTodoList', 'post', data)
}

export const getChartsData = () => {
  return request('/api/getCharts', 'get')
}

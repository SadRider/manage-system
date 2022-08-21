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

export const getTableData = (data) => {
  return request('/api/getTableData', 'post', data)
}

export const delTableData = (data) => {
  return request('/api/delTableData', 'post', data)
}

export const updateTableData = (data) => {
  return request('/api/updateTableData', 'post', data)
}

export const getMessageList = () => {
  return request('/api/getMessageList', 'get')
}

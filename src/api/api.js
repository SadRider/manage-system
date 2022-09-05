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
export const readMessage = (data) => {
  return request('/api/readMessage', 'post', data)
}

export const readAllMessage = () => {
  return request('/api/readAllMessage', 'get')
}

export const delMessage = (data) => {
  return request('/api/delMessage', 'post', data)
}

export const delAllMessage = () => {
  return request('/api/delAllMessage', 'get')
}

export const returnMessage = (data) => {
  return request('/api/returnMessage', 'post', data)
}

export const returnAllMessage = () => {
  return request('/api/returnAllMessage', 'get')
}

export const clearAllMessage = () => {
  return request('/api/clearAllMessage', 'get')
}

export const sumbitFormData = (data) => {
  return request('/api/submitForm', 'post', data)
}

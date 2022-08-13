import request from '@/utils/request'

export const userLogin = (data) => {
    return request('/api/userLogin', 'post', data)
}
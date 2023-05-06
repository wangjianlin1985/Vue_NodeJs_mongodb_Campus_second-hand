import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getInfo(token) {
  return request({
    url: '/admin/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}

export function getAllUser() {
  return request({
    url: '/admin/allAdmin',
    method: 'post'
  })
}

export function modifyUserInfo(data) {
  return request({
    url: '/admin/modifyUserInfo',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/admin/adduser',
    method: 'post',
    data
  })
}

export function deluser(data) {
  return request({
    url: '/admin/delUser',
    method: 'post',
    data
  })
}

import request from '@/utils/request'

export function getInfo(data) {
  return request({
    url: 'info/sellInfoList',
    method: 'post',
    data
  })
}

export function modifyStatus(data) {
  return request({
    url: 'info/modifyStatus',
    method: 'post',
    data
  })
}

export function delInfo(data) {
  return request({
    url: 'info/delInfo',
    method: 'post',
    data
  })
}

export function searchInfo(data) {
  return request({
    url: 'info/searchList',
    method: 'post',
    data
  })
}

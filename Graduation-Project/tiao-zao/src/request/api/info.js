/**
 * 二手产品信息接口
 */

 import base from './base'
 import axios from '../http';
 import qs from 'qs'

 function axiosPost(url, params) {
   return axios({
     method: 'post',
     url: `${base.sq}/info/${url}`,
     data: qs.stringify(params),
     withCredentials: true
   })
 }

 /**
  * formdata 方式上传数据
  * @param {string} url 上传地址
  * @param {formdata} params 上传数据
  */
 function axiosPostUpload(url, params) {
   return axios({
     method: 'post',
     url: `${base.sq}/info/${url}`,
     data: params,
     withCredentials: true,
     headers: {
       "Content-Type": "multipart/form-data"
     }
   })
 }

 const infoApi = {

  // 发布产品信息
  publish(params) {
    return axiosPostUpload('publise', params)
  },

  // 获取用户发布的信息列表
  getInfoList(params) {
    return axiosPost('getInfoList', params)
  },

  // 获取用户发布的信息
  getInfo(params) {
    return axiosPost('getInfo', params)
  },

  // 修改用户发布的信息
  modifyInfo(params) {
    return axiosPostUpload('modifyInfo', params)
  },

  // 查询所有出售消息
  sellInfoList(params) {
    return axiosPost('sellInfoList', params)
  },

  // 全局搜索
  searchList(params) {
    return axiosPost('searchList', params)
  }
 }

 export default infoApi
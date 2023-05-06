/**
 * 首页的所有请求接口
 */

 import base from "./base";
 import axios from '../http'
 import qs from 'qs'
 

 const homeApi = {
  //  获取首页轮播图
   getSwipe (params) {
    console.log(`轮播图地址：${base.sq}/homeSwipe`)
    return axios.post(`${base.sq}/homeSwipe`, qs.stringify(params))
   }
 }

 export default homeApi
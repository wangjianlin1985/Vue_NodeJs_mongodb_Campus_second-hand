import base from "./base";
import axios from '../http'
import qs from 'qs'

function axiosGet(url, params) {
  return axios({
    method: 'get',
    url: `${base.sq}/users/${url}`,
    params: params,
    withCredentials:true
  })
}

function axiosPost(url, params) {
  return axios({
    method: 'post',
    url: `${base.sq}/users/${url}`,
    data: qs.stringify(params),
    withCredentials: true
  })
}
function axiosPostUpload(url, params) {
  return axios({
    method: 'post',
    url: `${base.sq}/users/${url}`,
    data: params,
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

const userApi = {
  // 检查注册的用户名是否已经存在
  hasUserName(params) {
    return axiosPost('hasUserName', params)
  },
  // 注册
  register(params) {
    return axiosPost('register', params)
  },
  // 获取登录验证图片
  getVerificationPic() {
    return axiosGet('verificationPic')
  },
  login(params) {
    return axiosPost('login', params)
  },
  // 获取电话验证码
  getPhoneVerification(params) {
    return axiosPost('phoneVerification', params)
  },
  // 校验电话验证码
  checkPhoneVerification(params) {
     return axiosPost('checkPhoneVerification', params)
  },
  // 重置密码
  resetPassword(params) {
    return axiosPost('resetPassword', params)
  },
  // 获取用户信息
  getUserData() {
    return axiosPost('getUserData')
  },
  // 用户上传头像
  uploadAvatar(params) {
    return axiosPostUpload('uploadAvatar', params)
  },
  // 修改密码
  modifyPassword(params) {
    return axiosPost('modifyPassword', params)
  }


}

export default userApi
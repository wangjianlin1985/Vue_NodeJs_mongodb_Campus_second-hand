import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 公司的信息
    companyData:'',
    // 登录用户的信息
    userData: '',
    // 找回密码是存储的用户信息
    uData: '',
    // 用户搜索时跳转的页面
    searchUrl: '',
    // 用户登录时存储用户对应的企业信息
    loginCompany: '',
    keyWords :'',
    // 商品首页的分类id
    categoriesId:'',
    exhibitionData: '',
    // 经贸活动中活动报名
    tempObject: '', //获取经贸活动报名数据对象,
    islogin: false
  },
  mutations: {
    changeCompany(state,nowData) {
      state.companyData = nowData
    },
    changeUserData (state, userData) {
      state.userData = userData
    },
    changeUData(state, uData) {
      state.uData = uData
    },
    changeSearchUrl(state, searchUrl) {
      state.searchUrl = searchUrl
    },
    changeKeyWords(state, keyWords) {
      state.keyWords = keyWords
    },
    changeCategoriesId(state, categoriesId) {
      state.categoriesId = categoriesId
    },
    changeLoginCompany(state, loginCompany) {
      state.loginCompany = loginCompany
    },
    changeExhibition(state, exhibitionData) {
      state.exhibitionData = exhibitionData
    },
    islogin(state, islogin) {
      state.islogin = islogin
    },
    
  },
  actions: {
  },
  modules: {
  }
})

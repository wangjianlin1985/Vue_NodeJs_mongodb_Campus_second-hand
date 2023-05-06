import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Storage from 'vue-ls';
import api from './request/api'
import './mock'




// 配置ls
let options = {
  namespace: '', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'session', // storage name session, local, memory
};

Vue.use(Storage, options)

import "amfe-flexible";
import md5 from 'js-md5'
Vue.prototype.md5 = md5
import TabBar from './components/tabBar.vue'


// 注册全局组件

// 引入封装的接口文件
Vue.prototype.$api = api


Vue.component('TabBar', TabBar)
import { Dialog, Toast  } from 'vant';


Vue.use(Dialog).use(Toast)

Vue.config.productionTip = false



// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (to.meta.LoginCheck) {
    if (Vue.ls.get('user')) {
      next()
    }
    else {
      next({
        name: 'login'
      })
    }
  } 
  next()

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import loginRouter from './loginRouter'
import MeRouter from './MeRouter'
import InfoRouter from './infoRouter'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  ...MeRouter,
  ...InfoRouter,
  ...loginRouter
]

const router = new VueRouter({
  routes
})

export default router

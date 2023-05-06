const loginRouter = [
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search.vue'),
    meta: {
      title: '搜索'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/login/register.vue'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/registerSuccess',
    name: 'registerSuccess',
    component: () => import('../views/login/registerSuccess.vue'),
    meta: {
      title: '注册成功'
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/findPwd1',
    name: 'findPwd1',
    component: () => import('../views/login/findPwd1.vue'),
    meta: {
      title: '忘记密码'
    }
  },
  {
    path: '/findPwd2',
    name: 'findPwd2',
    component: () => import('../views/login/findPwd2.vue'),
    meta: {
      title: '忘记密码'
    }
  },
  {
    path: '/findPwd3',
    name: 'findPwd3',
    component: () => import('../views/login/findPwd3.vue'),
    meta: {
      title: '重置密码'
    }
  },
  {
    path: '/findPwd4',
    name: 'findPwd4',
    component: () => import('../views/login/findPwd4.vue'),
    meta: {
      title: '重置成功'
    }
  },
  {
    path: '/changePassword',
    name: 'changePassword',
    component: () => import('../views/login/changePassword.vue'),
    meta: {
      title: '修改密码',
      // 是否需要登录权限
      LoginCheck: true
    }
  }
]

export default loginRouter
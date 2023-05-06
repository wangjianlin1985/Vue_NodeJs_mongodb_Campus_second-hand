const MeRouter = [{
      path: '/about',
      name: 'about',
      component: () => import('../views/Me/About.vue'),
      meta: {
        title: '我的',
        // 是否需要登录权限
        LoginCheck: true
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../views/Me/setting.vue'),
      meta: {
        title: '设置',
        // 是否需要登录权限
        LoginCheck: true
      }
    },
    {
      path: '/myProduct',
      name: 'myProduct',
      component: () => import('../views/Me/myProduct.vue'),
      meta: {
        title: '我的产品',
        // 是否需要登录权限
        LoginCheck: true
      }
    },
    {
      path: '/otherInfo/:category',
      name: 'otherInfo',
      component: () => import('../views/Me/otherInfo.vue'),
      meta: {
        title: '我的信息',
        // 是否需要登录权限
        LoginCheck: true
      }
    },
    {
      path: '/publish',
      name: 'publish',
      component: () => import('../views/Me/publish.vue'),
      meta: {
        title: '发布',
        LoginCheck: true
      },
    },
    {
      path: '/modifyInfo/:_id',
      name: 'modifyInfo',
      component: () => import('../views/Me/modifyInfo.vue'),
      meta: {
        title: '修改发布消息',
        LoginCheck: true
      },
    },
]

export default MeRouter
const infoRouter = [{
    path: '/sellInfoList',
    name: 'sellInfoList',
    component: () => import('../views/info/sellInfoList.vue'),
    meta: {
      title: '出售列表页',
    }
  },
  {
    path: '/sellInfoDetail/:_id',
    name: 'sellInfoDetail',
    component: () => import('../views/info/sellInfoDeatil.vue'),
    meta: {
      title: '出售消息详情'
    },
  },
  {
    path: '/otherInfoList/:category',
    name: 'otherInfoList',
    component: () => import('../views/info/otherInfoList.vue'),
    meta: {
      title: '出售消息详情'
    },
  },
  {
    path: '/otherInfoDeatil/:_id',
    name: 'otherInfoDeatil',
    component: () => import('../views/info/otherInfoDeatil.vue'),
    meta: {
      title: '出售消息详情'
    },
  },
  {
    path: '/searchList/:key',
    name: 'searchList',
    component: () => import('../views/info/searchList.vue'),
    meta: {
      title: '搜索列表页'
    },
  },
]

export default infoRouter
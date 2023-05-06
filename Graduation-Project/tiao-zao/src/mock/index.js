import Mock from 'mockjs'

let Random = Mock.Random
Mock.setup({
  timeout: '200-600'
})

// 首页轮播图
Mock.mock(/homeSwipe/, 'post', {
  code: 0,
  msg: 'ok',
  'data|5': [
    {
      url: "@dataImage(750x368)",
      link: Random.url(),
      id: '@string(18)'
    },
  ]
})


// 产品分类
Mock.mock(/productsCategories/, 'post', {
  code: 0,
  msg: 'ok',
  'data|9': [
    {
      categoryId: '@string(18)',
      categoryName: '@cword(2,4)'
    }
  ]
})

// 产品展示
Mock.mock(/categoriesProducts/, 'post', {
  code: 0,
  msg: 'ok',
  'data|30': [
    {
      ProductId: '@string(18)',
      productPic: '@dataImage(750x368)',
      productName: '@cword(4,8)',
      productPrice: '@natural(1,10000)'
    }
  ]
})



Mock.mock(/company\/swipter/, 'post', {
  "msg": "操作成功",
  "code": "0",
  "data": [
    {
      "HTTP": "dsadsad",
      "TITLE": "dsadsad",
      "INDEXPHOTO_ID": "cffa04b3d4f44224a836981bef69658e",
      "REMARK": "dsads",
      "URL": "@dataImage(1500x736)"
    },
    {
      "HTTP": "fds",
      "TITLE": "fds",
      "INDEXPHOTO_ID": "c8874230fab84d54bca7c09814a489c6",
      "REMARK": "fds",
      "URL": "@dataImage(1500x736)"
    }
  ]
})






// 公司产品
Mock.mock(/\/getEnterpriseIndex/, 'post', {
  "msg": "操作成功",
  "code": "0",
  "data|5": [
    {
      "IMAGE_PATH": "@Image(345x310)",
      "GOODS_NAME": "@cword(3)",
      "GOODS_ID": "@string(32)",
      "ROW_ID|+1": 1,
    }
  ],
  "page": {
    "showCount": 6,
    "totalPage": 3,
    "totalResult": 1,
    "currentPage": 1,
    "currentResult": 0,
    "entityOrField": true
  }
})
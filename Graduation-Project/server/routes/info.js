const express = require("express")
const path = require("path")
let mongoose = require("mongoose")
//引入 数据库 Schema
const Info = require("../models/info")
const Admin = require("../models/admin")
const router = express.Router()
const jwt = require("jsonwebtoken")
const multer = require("multer")
const fs = require("fs")
const assert = require("http-assert")
// 引入封装的解析jwt的中间件
const decodeJwt = require("../middleware/decodeJwt")
const upload = multer({
  dest: path.join(__dirname, "../", "uploads")
})

const { host2: host } = require("../utils/getLocalIp")

// 读取 token 签名
// 读取取token的加密文件

let secret
fs.readFile(__dirname + "../../.secret", (err, data) => {
  if (err) {
    console.log(err)
    return
  } else {
    secret = data.toString()
  }
})

// 用户发布信息
router.post(
  "/publise",
  decodeJwt(),
  upload.array("file", 5),
  async (req, res) => {
    /**
     * 1. 通过token 拿到用户_id
     * 2. 拿到上传的图片地址并放到数组里面
     * 3. 插入发布信息
     */
    let { _id: owner_id } = req
    let img = []
    if (req.files.length !== 0) {
      req.files.forEach(item => {
        img.push(`/uploads/${item.filename}`)
      })
    }
    let { category, title, price, description, contact } = req.body

    let info = new Info({
      category,
      title,
      price,
      description,
      owner_id,
      img,
      contact
    })
    try {
      let result = await info.save()
      if (result) {
        res.json({
          code: 0,
          msg: "ok"
        })
      } else {
        res.status(500).json({
          code: 1,
          msg: "error"
        })
      }
    } catch (err) {
      assert(false, 500, "服务器忙")
    }
  }
)

// 分页查询用户发布信息列表
router.post("/getInfoList", decodeJwt(), async (req, res) => {
  let { category, currentPage, showCount } = req.body

  let owner_id = req._id
  try {
    // 查询总条数
    let count = await Info.countDocuments({
      category,
      owner_id
    })

    let result = await Info.find(
      {
        category,
        owner_id
      },
      {
        description: 0
      }
    )
      .limit(parseInt(showCount))
      .skip((parseInt(currentPage) - 1) * showCount)
      .sort({
        createdTime: -1
      })

    result.forEach(item => {
      if (item.img && item.img.length !== 0) {
        item.img = item.img.map(itm => `${host}${itm}`)
      }
    })

    res.json({
      code: 0,
      total: count,
      data: result
    })
  } catch (error) {
    console.log(error)
  }
})

// 查询单个用户发布的信息详情
router.post("/getInfo", async (req, res) => {
  let { _id } = req.body

  let result = await Info.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(_id)
      }
    },
    {
      $lookup: {
        from: "users", // 数据库关联的表名
        localField: "owner_id", // 外键
        foreignField: "_id", // 关联表的主键
        as: "userInfo"
      }
    }
  ])

  result.forEach(item => {
    if (item.img && item.img.length !== 0) {
      item.img = item.img.map(itm => `${host}${itm}`)
    }
  })

  let tempObj = result[0].userInfo[0]

  for (const key in tempObj) {
    if (tempObj.hasOwnProperty(key)) {
      if (key !== "avatar" && key !== "nickName") {
        delete tempObj[key]
      }
      if (key === "avatar") {
        tempObj[key] = `${host}${tempObj[key]}`
      }
    }
  }
  result[0].userInfo = result[0].userInfo[0]

  assert(result, 500, "系统忙，请稍后重试")
  res.json({
    code: 0,
    msg: "ok",
    data: result[0]
  })
})

// 修改用户发布的信息
router.post(
  "/modifyInfo",
  decodeJwt(),
  upload.array("file", 5),
  async (req, res) => {
    let {
      category,
      title,
      price,
      description,
      contact,
      status,
      img,
      info_id
    } = req.body
    if(typeof(img) == "undefined") img = []
    else if(typeof (img) == "string"){
      img = img.substr(img.indexOf('/uploads'))
      img = [img]
    } else {
      for(var i=0;i<img.length;i++) {
        img[i] = img[i].substr(img[i].indexOf('/uploads'))
      }
    }
    if (req.files.length !== 0) {
      req.files.forEach(item => {
        img.push(`/uploads/${item.filename}`)
      })
    }
    try {
      let result = await Info.updateOne(
        {
          _id: info_id
        },
        {
          category: parseInt(category),
          title,
          price,
          description,
          contact,
          status: parseInt(status),
          img
        }
      )
      res.json({
        code: 0,
        msg: "ok",
        data: ""
      })
    } catch (err) {
      assert(false, err.code, err.message)
    }
  }
)

// 分页查询所有出售信息
router.post("/sellInfoList", async (req, res) => {
  let { category, currentPage, showCount } = req.body

  category = parseInt(category)
  currentPage = parseInt(currentPage)
  showCount = parseInt(showCount)

  // 查询总条数
  let count = await Info.countDocuments({
    category,
    status: 1
  })

  try {
    let result = await Info.aggregate([
      {
        $match: {
          category: category,
          status: 1
        }
      },
      {
        $lookup: {
          from: "users", // 数据库关联的表名
          localField: "owner_id", // 外键
          foreignField: "_id", // 关联表的主键
          as: "nickName"
        }
      },
      {
        $sort: {
          createdTime: -1
        }
      },
      {
        $skip: (currentPage - 1) * showCount
      },
      {
        $limit: showCount
      }
    ])
    result.forEach(item => {
      item.nickName = item.nickName.map(item2 => item2.nickName)[0]
      if (item.img && item.img.length !== 0) {
        item.img = item.img.map(itm => `${host}${itm}`)
      }
    })
    res.json({
      code: 0,
      msg: "ok",
      total: count,
      data: result
    })
  } catch (error) {
    console.log(error)
  }
})

// 全局搜索
router.post("/searchList", async (req, res) => {
  //let { key, currentPage, showCount, category } = req.body
  let { key, currentPage, showCount} = req.body
  console.log(key,currentPage,showCount)
  const reg = new RegExp(key, "i")
  // 查询总条数
  const total = await Info.countDocuments({
    $or: [
      {
        title: {
          $regex: reg,
        },
      },
    ],
    status: 1,
    //category,
  })

  // 分页查询
  currentPage = parseInt(currentPage)
  showCount = parseInt(showCount)

  try {
    let result = await Info.aggregate([
      {
        $match: {
          $or: [
            {
              title: {
                $regex: reg,
              },
            },
          ],
          status: 1,
          //category,
        },
      },
      {
        $lookup: {
          from: 'users', // 数据库关联的表名
          localField: 'owner_id', // 外键
          foreignField: '_id', // 关联表的主键
          as: 'nickName',
        },
      },
      {
        $sort: {
          createdTime: -1,
        },
      },
      {
        $skip: (currentPage - 1) * showCount,
      },
      {
        $limit: showCount,
      },
    ])

    let categories = ['出售商品', '采购需求', '校园活动', '校园吐槽']

    result.forEach(item => {
      item.nickName = item.nickName.map(item2 => item2.nickName)[0]
      if (item.img && item.img.length !== 0) {
        item.img = item.img.map(itm => `${host}${itm}`)
      }
      item.category = categories[parseInt(item.category) - 1]
    })

    res.json({
      code: 0,
      msg: "ok",
      total,
      data: result
    })
  } catch (error) {
    console.log(error)
  }
})

// 修改消息状态
router.post("/modifyStatus", decodeJwt(Admin), async (req, res) => {
  const {_id} = req.body
  try {
    await Info.updateOne({_id}, {status: 0})
    res.json({
      code: 0,
      msg: "ok",
    })
    
  } catch (err) {
    assert(false, 500, '服务器繁忙')
  }
})

// 删除消息
router.post("/delInfo", decodeJwt(Admin), async (req, res) => {
  const { _id } = req.body
  try {
    await Info.remove({ _id })
    res.json({
      code: 0,
      msg: "ok",
    })
  } catch (err) {
    assert(false, 500, "服务器繁忙")
  }
})
module.exports = router

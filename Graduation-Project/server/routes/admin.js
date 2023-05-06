const express = require("express")
const router = express.Router()
const md5 = require("blueimp-md5")
const jwt = require("jsonwebtoken")
const decodeJwt = require("../middleware/decodeJwt")
const assert = require("http-assert")

const Admin = require("../models/admin")
const { secret: jwtsecret } = require("../utils/getSecret")

const { host2: host } = require("../utils/getLocalIp")

/* login*/
router.post("/login", async (req, res) => {
  let { account, password } = req.body

  let data = await Admin.findOne(
    {
      account,
    },
    { password: 1 }
  )

  assert(data, 422, "用户名和密码不匹配")
  assert(data.password === md5(password), 422, "用户名和密码不匹配")
  let cecret = await jwtsecret
  // 用户_id 存入 token
  const token = jwt.sign(
    {
      _id: data._id,
    },
    cecret,
    {
      expiresIn: "1h",
    }
  )

  res.json({
    code: 0,
    msg: "ok",
    data: {
      token,
    },
  })
})

router.get("/info", decodeJwt(Admin), async (req, res) => {
  let { _id } = req
  let result = await Admin.findById(_id)
  result.avatar = host + result.avatar
  res.json({
    code: 0,
    msg: "ok",
    data: result,
  })
})

router.post("/logout", decodeJwt(Admin), async (req, res) => {
  res.json({
    code: 0,
    msg: "ok",
    data: "",
  })
})

// 获取所有的管理员列表
router.post("/allAdmin", decodeJwt(Admin), async (req, res) => {
  let result = await Admin.find({}, { account: 1, name: 1 })
  res.json({
    code: 0,
    msg: "ok",
    data: result,
  })
})

// 修改管理员信息
router.post("/modifyUserInfo", decodeJwt(Admin), async (req, res) => {
  let { _id, oldPassword, newPassword, account } = req.body
  try {
    let data = await Admin.findById({ _id }, { password: 1 })
    if (data.password !== md5(oldPassword)) {
      res.status(422).json({
        code: 1,
        msg: "输入旧密码有误",
        data: "",
      })
    } else {
      try {
        let data = await Admin.updateOne({_id}, {password: md5(newPassword)})
        console.log(data)
        res.json({
          code: 0,
          msg: 'ok',
          data: ''
        })
      } catch (err) {
        res.status(500).json({
          code: 1,
          msg: "服务器繁忙"
        })
        
      }
    }
  } catch (error) {
    console.log(error)
  }
})

// 添加管理员
router.post("/addUser", decodeJwt(Admin), async (req, res) => {
  let { newPassword, account, name } = req.body
  let data = await Admin.findOne({account}, {account: 1})
  assert(!data, 422, '该登录账号已经存在')
  let admin = new Admin({
    account,
    name,
    password: md5(newPassword),
    avatar: "/uploads/default.jpg",
  })
  try {
    let result = await admin.save()
      res.json({
        code: 0,
        msg: "ok",
      })
  } catch (err) {
     res.status(500).json({
       code: 1,
       msg: "服务器繁忙",
     })
  }
})

// 删除管理员

router.post("/delUser", decodeJwt(Admin), async (req, res) => {
  const {_id} = req.body
  try {
    let data = await Admin.remove({_id})
    res.json({
      code:0,
      msg: 'ok'
    })
    
  } catch (error) {
    assert(false, '500', '服务器繁忙')
  }
})

module.exports = router

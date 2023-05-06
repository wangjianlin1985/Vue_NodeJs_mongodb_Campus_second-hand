const express = require('express')
const path = require('path');
//引入 数据库 Schema
const User = require('../models/user')
const md5 = require('blueimp-md5')
const router = express.Router()
const svgCaptcha = require('svg-captcha');
const jwt = require('jsonwebtoken')
const multer = require('multer')
const fs = require('fs')
const assert = require('http-assert')
// 引入封装的解析jwt的中间件
const decodeJwt = require('../middleware/decodeJwt')
const upload = multer({
  dest: path.join(__dirname, '../', 'uploads')
}) 

const {host2:host}= require('../utils/getLocalIp')



// 读取 token 签名
// 读取取token的加密文件

let secret
fs.readFile(__dirname + '../../.secret', (err, data) => {
  if (err) {
    console.log(err);
    return
  } else {
    secret = data.toString()
  }
})

// 检查注册的用户名是否已经存在
router.post('/hasUserName', async (req, res) => {
  
  let {
    account
  } = req.body

  try {
    let result = await User.findOne({
      account
    },{account:1,phone:1})
    if (!result) {
      res.json({
        code: 0,
        msg: 'ok'
      })
    } else {  
      res.json({
        code: 1,
        msg: '用户已存在',
        data: {
          phone: result.phone,
          account
        }
      })
    }
  } catch (error) {
    console.log(`用户查询：${error}`);
    res.json({
      code: -1,
      msg: '数据库查询失败'
    })
  }
  
})

router.post('/register', async (req, res) => {
  let {
    account,
    password,
    phone,
    nickName
  } = req.body
  let user = new User ({
    account,
    password: md5(password),
    phone,
    nickName,
    avatar: `${host}/uploads/default.jpg`
  })
  try {
    let result = await user.save()
    if (result) {
      res.json({
        code:0,
        msg: 'ok'
      })
    }else {
      res.status(500).json({
        code:1,
        msg:'error'
      })
    }
    
  } catch (error) {
    console.log(`注册${error}`);
    res.json({
      code: 1,
      msg: 'error'
    })
  }
})

// 获取图片验证码
router.get('/verificationPic', (req, res) => {
  
   let codeConfig = {
     size: 4, // 验证码长度
     ignoreChars: '0o1i', // 验证码字符中排除 0o1i
     noise: 2, // 干扰线条的数量
     height: 37.5,
     width: 101

   }
   let captcha = svgCaptcha.create(codeConfig);

   req.session.captcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码

   let codeData = {
     img: captcha.data
   }
   res.json(codeData);
   console.log(req.session.captcha);
   
})

router.post('/login',  async (req, res) => {
  let {account, password, code} = req.body
  if(req.session.captcha !== code.toLowerCase()) {
    res.status(422).json({
      code: 2,
      msg: '验证码有误'
    })
    return
  }
  let data = await User.findOne({
    account
  }, {
    _id: 1,
    nickName: 1,
    avatar: 1,
    phone:1,
    password:1,
    account
  })
  
  assert(data, 422, '用户名和密码不匹配')
  assert(data.password === md5(password), 422, '用户名和密码不匹配')
  // 生成token 签名
  const token = jwt.sign({
    _id: data._id
  }, secret, {
    expiresIn: '1h'
  })
  data.avatar = host + data.avatar
  res.json({
    code: 0,
    msg: 'ok',
    data: {
      account,
      nickName: data.nickName,
      avatar: data.avatar,
      phone: data.phone,
      token
    }
  })
  
})

// 获取短信验证码
router.post('/phoneVerification', async (req, res) => {
    // session 保存用户信息
    req.session.phoneVerification = parseInt(Math.random() * 10000)
    let phoneCode = req.session.phoneVerification
  res.json({
    data: phoneCode
  })
})

// 校验短信验证码
router.post('/checkPhoneVerification', async (req, res) => {
  let {code} = req.body
  if (parseInt(code) === req.session.phoneVerification) {
    res.json({
      code: 0,
      msg: 'ok',
      data: ''
    })
  } else {
    res.status(422).json({
      code: 1,
      msg: '验证码错误',
      data: ''
    })
  }
})

// 重置密码
router.post('/resetPassword', async (req, res) => {
  let {phone, password} = req.body
  assert(phone&&password, 422, '请求参数有误')
  
  try {
    let result = await User.updateOne({phone}, {password:md5(password)})
    if (result) {
      res.json({
        code:0,
        msg: 'ok',
        data: ''
      })
    }
    
  } catch (error) {
    res.status(500).json({
      code: '-1',
      msg: '服务器繁忙，请稍后重试'
    })
  }

})

// 获取用户信息
router.post('/getUserData',decodeJwt(), async (req, res) => {
  let {_id} = req
  try {
    let result = await User.findOne({_id},{nickName:1, avatar: 1})
    if (result) {
      res.json({
        code: 0,
        msg: 'ok',
        data: result
      })
    }else {
      assert(false, 500, '服务器出错')
    }
    
  } catch (err) {
    console.log(err);
    assert(false, 500, '服务器出错')
    
  }
  
})

// 上传用户头像
router.post('/uploadAvatar', decodeJwt(), upload.single('file'),async(req, res) => {
  assert(req.file, '413','上传失败')
  let path = `/uploads/${req.file.filename}`
  try {
    await User.updateOne({_id:req._id},{avatar: path})
  } catch (err) {
    assert(req.file, '413', '上传失败')
  }
  if (req.file) {
    res.json({
      code: 0,
      msg: 'ok',
      data: {
        path:`${host}${path}`
      }
    })
  }
  
  
})

// 修改密码
router.post('/modifyPassword', decodeJwt(), async (req, res) => {
  let {oldPassword, newPassword} = req.body
  let _id = req._id
    let {password} = await User.findOne({_id}, {password:1})
    console.log(password);
    assert(md5(oldPassword) === password, 422, '您输入的旧密码错误')
    let result = await User.updateOne({
      _id
    }, {
      password: md5(newPassword)
    })
    res.json({
      code: 0,
      msg: 'ok'
    })
})

module.exports = router

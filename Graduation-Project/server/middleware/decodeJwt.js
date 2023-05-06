const User = require('../models/user')
module.exports = (Model=User) => {
  const jwt = require('jsonwebtoken')
  const fs = require('fs')
  const assert = require('http-assert')
  let secret = fs.readFileSync(__dirname + '../../.secret').toString()
  return async (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
      // token 解密
      try {
        tokenData = jwt.verify(token.split(' ').pop(), secret)
        let {
          _id
        } = await Model.findById(tokenData._id)
        req._id = _id
        assert(req._id, 401, '请先登录')
        next()
      } catch (error) {
        console.log(error);
        
        res.status(403).json({
          code: 1,
          msg: '登录失效，请重新登录'
        })
        return
      }
    } else {
      assert(false, 401, '没有登录')
    }
  }
}
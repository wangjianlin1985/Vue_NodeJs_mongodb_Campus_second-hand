/**
 * 读取toke加密的key
 */

const fs = require('fs')
const getSecret = function () {
  let secret
  return new Promise((resolve, reject)=> {
     fs.readFile(__dirname + '../../.secret', (err, data) => {
       if (err) {
         reject(err)
         return
       } else {
         secret = data.toString()
         resolve(secret)
       }
     })
  })
}

// 导出一个 promis 对象
module.exports.secret = getSecret()
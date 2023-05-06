let mongoose = require('./db');

let Schema = mongoose.Schema

let userSchema = new Schema({
  phone: {
    type: Number,
    required: true
  },
  account: {
    type: String,
    required: true
  },
  nickName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  createdTime: {
    type: Date,
    // 当 new Model 的时候，如果你没有传递 create_time,则 mongoose 会调用 default 的指定 Date.now 方法的返回值作为默认值
    default: Date.now
  },
  lastModifiedTime: {
    type: Date,
    default: Date.now
  },
  gender: {
    type: Number,
    // -1保密，0男，1女
    enum: [-1, 0, 1], //限定
    default: -1
  }
})

module.exports = mongoose.model('User', userSchema)

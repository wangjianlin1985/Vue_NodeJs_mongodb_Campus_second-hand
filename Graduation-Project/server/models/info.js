let mongoose = require('./db');
let Schema = mongoose.Schema;

let infoSchema = new Schema({
  // 分类 1==发布出售信息, 2==发布采购信息, 3==发布活动信息, 4==发布吐槽信息
  category: {
    required: true,
    type: Number,
    enum: [1,2,3,4]
  },
  // 标题
  title: {
    type: String,
    required: true
  },
  // 价格
  price: {
    type: String,
    // required: true
  },
  // 描述
  description: {
    type: String,
    required: true
  },
  // 日期
  createdTime: {
    type: Date,
    default: Date.now
  },
  // 发布人_id
  owner_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  // 状态 1==已发布， 0==撤回
  status: {
    type: Number,
    enum: [1,0],
    default: 1,
    required: true
  },
  img: {
    type: [String]
  },
  // 联系方式
  contact:String
})

module.exports = mongoose.model('Info', infoSchema)

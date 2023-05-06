const mongoose = require('mongoose')

//  连接 mongoodb 数据库
mongoose.connect('mongodb://localhost/tiaoZao', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected success');
})
mongoose.connection.on('error', () => {
  console.log('Mongoose connected fail');
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connected disconnected')
})

module.exports = mongoose
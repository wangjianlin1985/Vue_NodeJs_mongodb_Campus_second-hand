let mongoose = require('./db');

let Schema = mongoose.Schema

let adminSchema = new Schema({
  account: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },

})

module.exports = mongoose.model('Admin', adminSchema)
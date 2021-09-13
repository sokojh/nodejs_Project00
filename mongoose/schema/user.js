const mongoose = require('mongoose')
const User = new mongoose.Schema({
  email: { type: String, default: '', required: true, unique: true },
  weeksomId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
  profileImgKey: { type: String, default: '' },
  userinfo: { type: String, default: '' },
  following: { type: Array },
  follower: { type: Array },
  article: { type: Array },
  bookmark: { type: Array },
})

module.exports = User

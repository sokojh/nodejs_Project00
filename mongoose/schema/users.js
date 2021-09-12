const mongoose = require('mongoose')
const Users = new mongoose.Schema({
  email: { type: String, default: '', required: true, unique: true },
  hashedPassword: { type: String, required: true },
  nickname: { type: String, required: true },
  profileImgKey: { type: String },
  userinfo: { type: String },
  following: { type: Array },
  follower: { type: Array },
  article: { type: Array },
  bookmark: { type: Array },
})

module.exports = Users

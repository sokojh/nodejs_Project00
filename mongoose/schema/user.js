const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const User = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  weeksomId: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  nickname: { type: String, required: true },
  profileImgKey: { type: String, default: '' },
  userinfo: { type: String, default: '' },
  following: { type: Array },
  follower: { type: Array },
  article: { type: Array },
  bookmark: { type: Array },
  versionKey: false,
})

User.plugin(passportLocalMongoose)

module.exports = User

const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const User = new mongoose.Schema({
  // 로그인정보
  email: { type: String, required: true, unique: true },
  weeksomId: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  nickname: { type: String, required: true },
  profileImgKey: { type: String, default: '' },
  userinfo: { type: String, default: '' },
  // 유져데이터
  following: { type: Array },
  follower: { type: Array },
  article: { type: Array },
  likeAticle: { type: Array },
  bookmark: { type: Array },
  // 카운 데이터
  followingCount: { type: Number },
  followerCount: { type: Number },
  likeCount: { type: Number },
  bookmarkCount: { type: Number },
  versionKey: false,
})

User.plugin(passportLocalMongoose)

module.exports = User

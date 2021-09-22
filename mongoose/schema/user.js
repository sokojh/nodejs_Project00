const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const User = new mongoose.Schema({
  // 로그인정보
  email: { type: String, required: true, unique: true },
  weeksomId: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  nickname: { type: String, required: true },
  profileImgKey: { type: String, default: '' },
  userInfo: { type: String, default: '' },
  // 유져데이터
  // 관리자 스키마 필요
  following: { type: Array },
  follower: { type: Array },
  article: { type: Array }, // 작성 게시물들
  likeArticle: { type: Array }, // 좋아요 누른 게시물들
  bookmark: { type: Array }, // 즐겨찾기 게시물들
  // 카운팅 데이터
  followingCount: { type: Number },
  followerCount: { type: Number },
  articleCount: { type: Number },
  likeACount: { type: Number },
  bookmarkCount: { type: Number },
  versionKey: false,
})

User.plugin(passportLocalMongoose)

module.exports = User

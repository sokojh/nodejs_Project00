const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const User = new mongoose.Schema({
  // 로그인정보
  email: { type: String, required: true, unique: true },
  weeksomId: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  nickname: { type: String, required: true },
  profileImgKey: {
    type: String,
    default:
      'https://image-upload-server1.s3.ap-northeast-2.amazonaws.com/user.jpg',
  },
  userInfo: { type: String, default: '' },
  // 유져데이터
  // 관리자 스키마 필요
  following: { type: Array },
  follower: { type: Array },
  article: { type: Array }, // 작성 게시물들
  likeArticle: { type: Array }, // 좋아요 누른 게시물들
  bookmark: { type: Array }, // 즐겨찾기 게시물들
  // 카운팅 데이터
  followingCount: { type: Number, default: 0 },
  followerCount: { type: Number, default: 0 },
  articleCount: { type: Number, default: 0 },
  likeAcount: { type: Number, default: 0 },
  bookmarkCount: { type: Number, default: 0 },
  versionKey: false,
})

User.plugin(passportLocalMongoose)

module.exports = User

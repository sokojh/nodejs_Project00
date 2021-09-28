const mongoose = require('mongoose')

const Userdata = new mongoose.Schema({
  // 참조정보
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  // 유져데이터
  following: { type: Array },
  follower: { type: Array },
  article: { type: Array }, // 작성 게시물들
  likeArticle: { type: Array },// 좋아요 누른 게시물들
  bookmark: { type: Array }, // 즐겨찾기 게시물들

  versionKey: false,
})

module.exports = Userdata

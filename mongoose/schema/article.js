const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const Article = mongoose.Schema({
  auther: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contentImgKey: { type: Array },
  contentText: { type: String, required: true },
  createDate: { type: Date, default: Date.now, required: true },
  hashtag: { type: String },

  // 동적으로 변동될 수 있는 데이터
  likePeoples: { type: Array },
  bookmarkPeoples: { type: Array },
  // 카운팅 데이터
  viewCount: { type: Number, default: 0 },
  likeCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
  versionKey: false,
  // 카운트 스키마가 없으면 게시글의 갯수만큼 댓글 검색쿼리를 돌려야하고 디비성능이 떨어진다
})

Article.plugin(AutoIncrement, { inc_field: 'articleTotalCount' })

module.exports = Article

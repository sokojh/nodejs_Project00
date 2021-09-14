const mongoose = require('mongoose')

// 게시물 댓글
const Comment = mongoose.Schema({
  //참조게시물
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
  //작성자
  auther: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  //댓글내용
  text: { type: String, required: true },
  createDate: { type: Date, default: Date.now, required: true },

  // 동적으로 변동될 수 있는 데이터
  likeCount: { type: Number, default: 0 },
})

module.exports = Comment

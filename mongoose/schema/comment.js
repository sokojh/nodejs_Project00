const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

// 게시물 댓글
const Comment = mongoose.Schema({
  text: { type: String, required: true },
  createDate: { type: Date, default: Date.now, required: true },
  likeCount: { type: Number, required: true },
  article_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  like: { type: Array, required: true },
  user_id: { type: String, required: true },
})

Comment.plugin(AutoIncrement, { inc_field: 'commentTotalCount' })

module.exports = Comment

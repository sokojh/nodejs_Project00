const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

// 게시물 댓글
const Comment = mongoose.Schema({
  text: { type: String, required: true },
  createDate: { type: Date, default: Date.now, required: true },
  likeCount: { type: Number, required: true, default: 0 },
  article_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Article',
  },
  like: { type: Array, required: true, default: [] },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

Comment.plugin(AutoIncrement, { inc_field: 'commentTotalCount' })

module.exports = Comment

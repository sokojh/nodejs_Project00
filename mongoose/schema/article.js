const mongoose = require('mongoose')

const Article = mongoose.Schema({
  //auther: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', },
  contentImgKey: { type: Array },
  contentText: { type: String, required: true },
  createDate: { type: Date, default: Date.now, required: true },
})

module.exports = Article

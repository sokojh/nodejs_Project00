const mongoose = require('mongoose')

const Chat = mongoose.Schema({
  roomId: { type: String, required: true },
  auther: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  message: { type: String, required: true },
  createDate: { type: Date, default: Date.now, required: true },
  versionKey: false,
})

module.exports = Chat

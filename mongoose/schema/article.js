const mongoose = require('mongoose')
const Article = mongoose.Schema({
  auther: { type: mongoose.Schema.Types.ObjectId, ref:'Users' }

})
const mongoose = require('mongoose')
const schema = require('./schema/index')
require('dotenv').config()

const db = mongoose.connection
const model = (() => {
  db.on('error', console.error)
  db.on('open', () => {
    console.log('몽구스 연결')
  })
  // 아틀라스 클러스터 연결
  mongoose.connect(process.env.DB_URL, { //DB_URL 디비이름 사용(todoapp > weeksom으로 변경)
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  // 스키마 연결
  const model = {}
  for (let key in schema) {
    model[key] = mongoose.model(key, schema[key])
  }
  return model
})()

module.exports = model

const mongoose = require('mongoose')
const schema = require('./schema/0.index')
require('dotenv').config()

const db = mongoose.connection

// 커넥션 객체
const model = (() => {
  db.on('error', console.error)
  db.on('open', () => {
    console.log('몽구스 연결')
  })

  // 아틀라스 클러스터 > 디비 연결
  //DB_URL 디비이름 사용(todoapp > weeksom으로 변경)
  mongoose
    .connect(process.env.DB_URL, {
      // 디비연결 사용 옵션들
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: true,
    })
    .then(() => {
      console.log('weeksom 연결')
    })
    .catch((err) => console.log(err))

  // 스키마 연결
  const model = {} //model 변수 선언
  for (let key in schema) {
    //스키마에서 하나씩 꺼내서 key에 넣음
    model[key] = mongoose.model(key, schema[key])
  }
  return model
})() //함수 이후 ()붙이면 즉시실행함수

/** 즉시실행함수란 

function main() {
  // 함수내용
} // 작성된 함수

main() // 함수실행

// 이걸 람다식으로 바꾸게 되면

const main = () => {
  // 함수내용
} // 함수작성
main() // 함수실행

// 이걸 다음과같이 쓸 수 있다

const main = (() => {
  // 함수내용
})() // 즉시실행함수 : main을 호출하는 즉시 실행

*/

module.exports = model

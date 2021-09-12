// @ts-check
const express = require('express') // 익스프레스 서버모듈 가져오기
const app = express() // 익스프레스 객체 생성

// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy
// const session = require('express-session')
// app.use(
//   session({ secret: '세션비번', resave: true, saveUninitialized: false })
// )
// app.use(passport.initialize())
// app.use(passport.session())

app.use(express.urlencoded({ extended: true })) // 포스트 전송시 인코딩
app.use(express.json()) // post로 전달된 페이로드를 받을 수 있음
app.set('views', 'views') // 익스프레스 뷰 폴더 경로는 기본값으로 views를 사용
app.set('view engine', 'ejs') //뷰엔진 ejs 사용

app.get('/', (req, res) => {
  console.log('클라이언트 : 인덱스 페이지 연결')
  res.render(`index.ejs`)
})

app.use('/sendinput', require('../routes/sendinput'))
app.use('/signup', require('../routes/signup'))
app.use('/signin', require('../routes/signin'))

module.exports = app

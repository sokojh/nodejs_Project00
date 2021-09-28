// @ts-check

// 익스프레스 웹 기본 셋팅
const express = require('express') // 익스프레스 서버모듈 가져오기
const app = express() // 익스프레스 객체 생성
//const client = require('../src/mongo') // 몽고디비 연결 정보
app.use(express.urlencoded({ extended: true })) // 포스트 전송시 인코딩, 익스텐디드는 중첩허용
app.use(express.json()) // post로 전달된 페이로드를 받을 수 있음 => req.body 로 프론트 폼데이터 전달받음 : 'body'parser
// static 폴더 지정해주는것 public폴더를 고정폴더로 서버 시작할때 사용하게 만들어줌.
app.use('/public', express.static('public'))
app.set('views', 'views') // 익스프레스 뷰 폴더 경로는 기본값으로 views를 사용
app.set('view engine', 'ejs') //뷰엔진 ejs 사용

// @ts-ignore
// 세션 로그인 확인 미들웨어 ( 쿠키해시값 => 패스포트 디시리얼라이즈 자동실행 => 세션정보 확인 )
const loginCheck = (req, res, next) => {
  if (req.user) {
    console.log('사용자 로그인 확인.')
    // console.log('function loginCheck req.user : ', req.user, '확인')
    next()
  } else {
    console.log('로그인 정보가 없습니다. 로그인페이지로 갑니다.')
    res.render('signin.ejs')
  }
}

// 패스포트 기본셋팅
const passport = require('passport')
const session = require('express-session')
// multer 선언
const multer = require('multer')

// express session
app.use(session({ secret: '세션비번', resave: true, saveUninitialized: false }))
// passport미들웨어 사용
app.use(passport.initialize())
app.use(passport.session())
// passport 이메일 비번검사 및, 시리얼 디시리얼라이즈메서드
require('../config/passport')(passport)

// 접속페이지
// @ts-ignore
app.get('/', loginCheck, (req, res) => {
  console.log('get / 클라이언트 : 인덱스 페이지 연결 \n')
  res.render(`index.ejs`, { user: req.user })
})

// 로그인 인증 페이지 (시작페이지)
app.post(
  '/',
  passport.authenticate('local', {
    //로컬 방식으로 인증
    failureRedirect: '/fail', // TODO 로그인 실패 페이지구성
  }),
  // @ts-ignore
  (req, res) => {
    res.render('index.ejs', { user: req.user })
  }
)
// 유져리스트

// 라우터 연결
app.use('/sendinput', loginCheck, require('../routes/sendinput'))
app.use('/acount', require('../routes/acount'))
app.use('/userlist', loginCheck, require('../routes/userlist'))
app.use('/follow', loginCheck, require('../routes/follow'))
app.use('/article', loginCheck, require('../routes/article'))
app.use('/populateTest', require('../routes/populateTest'))
app.use('/comment', loginCheck, require('../routes/comment'))
//app.use('/:weeksomId', require('../routes/profile'))
app.use('/post', loginCheck, require('../routes/post'))
app.use('/search', require('../routes/search'))
// 몽구스 테스트
// const { Article } = require('../api/0.index')
// app.get('/read', Article.articleRead)
// app.post('/create', Article.articleCreate)
// app.patch('/update', Article.articleUpdate)
// app.delete('/delete/:id', Article.articleDelete)

module.exports = app

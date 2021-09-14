// @ts-check
const express = require('express') // 익스프레스 서버모듈 가져오기
const app = express() // 익스프레스 객체 생성
//const client = require('../src/mongo') // 몽고디비 연결 정보
app.use(express.urlencoded({ extended: true })) // 포스트 전송시 인코딩
app.use(express.json()) // post로 전달된 페이로드를 받을 수 있음 => req.body 로 프론트 폼데이터 전달받음 : 'body'parser
app.set('views', 'views') // 익스프레스 뷰 폴더 경로는 기본값으로 views를 사용
app.set('view engine', 'ejs') //뷰엔진 ejs 사용

// 몽구스 테스트
// const { Article } = require('../api/0.index')
// app.get('/read', Article.articleRead)
// app.post('/create', Article.articleCreate)
// app.patch('/update', Article.articleUpdate)
// app.delete('/delete/:id', Article.articleDelete)

// ------------- 로그인 기능처리 -----------------
// @ts-ignore
const loginCheck = (req, res, next) => {
  if (req.user) {
    console.log('req.user 정보 확인.')
    // console.log('function loginCheck req.user : ', req.user, '확인')
    next()
  } else {
    console.log('req.user 정보가 없습니다. 로그인페이지로 갑니다.')
    res.render('signin.ejs')
  }
}

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')

app.use(session({ secret: '세션비번', resave: true, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

// // ----------------- passport mongoose -----------
// const model = require('../mongoose/model')
// const UserModel = model.User

// passport.use(new LocalStrategy(UserModel.authenticate()))

// passport.serializeUser(UserModel.serializeUser())
// passport.deserializeUser(UserModel.deserializeUser())

// ------------------ 기존 passport -------------
const client = require('./mongo')
client.connect()
const db = client.db('weeksom')

passport.use(
  // 로그인 인증 모듈사용
  new LocalStrategy(
    {
      usernameField: 'email', // input name="email"
      passwordField: 'password',
      session: true, // 로그인세션 저장여부
      passReqToCallback: false, // 기타 입력값에 대해 req.body로 검증할지 여부
    },
    async (email, password, done) => {
      console.log('패스포트 로컬전략 로그인시도 :', email)

      const result = await db.collection('users').findOne({ email: email }) // 디비에서 검색
      // 결과값이 없으면
      if (!result) {
        return done(null, false, { message: '아이디가 존재하지 않습니다' })
      }
      if (password == result.password) {
        return done(null, result)
      } else {
        return done(null, false, { message: '비번이 틀렸습니다' })
      }
    }
  )
)

passport.serializeUser((user, done) => {
  // 패스포트에서 만들어진 result를 user로 받아서 사용
  console.log(
    '시리얼라이즈 :',
    // @ts-ignore
    user.email,
    '세션에 저장하고 세션데이터 쿠키에 전송'
  )
  // @ts-ignore
  done(null, user.email) // 세션데이터를 만들어서 쿠키로 보냄
})

passport.deserializeUser(async (email, done) => {
  //쿠키에 세션정보 가져와서
  //디비에서 위에있는 user.id로 유저를 찾은 뒤에 유저정보를
  db.collection('users').findOne({ email: email }, (err, result) => {
    // @ts-ignore
    console.log('디 시리얼라이즈 확인 : ', result.email) // 검색해보고
    done(null, result) // 끝냄
  })
})
// ------------------- 로그인처리 ----------------------

app.get('/', loginCheck, (req, res) => {
  console.log('get / 클라이언트 : 인덱스 페이지 연결 \n')
  res.render(`index.ejs`)
})

app.post(
  '/',
  passport.authenticate('local', {
    //로컬 방식으로 인증
    failureRedirect: '/fail',
  }),
  (req, res) => {
    res.render('index.ejs')
  }
)

app.use('/sendinput', loginCheck, require('../routes/sendinput'))
app.use('/acount', require('../routes/acount'))
app.use('/profile', require('../routes/profile'))

module.exports = app

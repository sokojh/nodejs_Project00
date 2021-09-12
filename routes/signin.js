// @ts-check

const router = require('express').Router()
const client = require('../src/mongo')


const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')

client.connect()
const db = client.db('weeksom')

router.use(
  session({ secret: '세션비번', resave: true, saveUninitialized: false })
)
router.use(passport.initialize())
router.use(passport.session())

router.get('/', (req, res) => {
  console.log('클라이언트 : signin 라우터 연결')
  res.render(`signin.ejs`)
})

router.post(
  '/',
  passport.authenticate('local', {
    //로컬 방식으로 인증
    failureRedirect: '/fail',
  }),
  (req, res, next) => {
    console.log('로그인정보 출력')
    console.log(req.body.email)
    next()
  },
  (req, res) => {
    console.log(req.body)
    res.redirect('/signin')
  }
)

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
      console.log(email, password, '로 로그인시도 중')
      const result = await db.collection('users').findOne({ email: email }) // 디비에서 검색
      if (!result)
        // 결과값이 없으면
        return done(null, false, { message: '아이디가 존재하지 않습니다' })
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
  done(null, user.email) // 세션데이터를 만들어서 쿠키로 보냄
})

passport.deserializeUser((email, done) => {
  //쿠키에 로그인이메일 가져와서
  //디비에서 위에있는 user.id로 유저를 찾은 뒤에 유저정보를
  db.collection('users').findOne({ email: email }, (err, result) => {
    console.log('쿠키확인', result.email) // 검색해보고
    done(null, result.email) // 끝냄
  })
})

module.exports = router

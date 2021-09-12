// @ts-check

const router = require('express').Router()
const client = require('../src/mongo')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')

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
      await client.connect()
      const db = client.db('weeksom')
      const cursor = await db.collection('users').findOne(
        { email: email }
        // (err, result) => {
        //   if (err) return done(err)
        //   if (!result)
        //     return done(null, false, { message: '아이디가 존재하지 않습니다' })
        //   if (password == result.password) {
        //     return done(null, result)
        //   } else {
        //     return done(null, false, { message: '비번이 틀렸습니다' })
        //   }
        // }
      )
      await cursor.forEach(console.log)
      await client.close()
    }
  )
)

passport.serializeUser((user, done) => {
  // 패스포트에서 만들어진 result를 user로 받아서 사용
  done(null, user.email) // 세션데이터를 만들어서 쿠키로 보냄
})

// passport.deserializeUser(function(아이디,done){
//   //디비에서 위에있는 user.id로 유저를 찾은 뒤에 유저정보를
//   db.collection('login').findOne({id:아이디},function(에러,결과){
//       done(null,결과)
//   })
// });

module.exports = router

const router = require('express').Router()
const { User } = require('../api/index') // 몽구스 api 임포트

//로그인
router.get('/signin', (req, res) => {
  console.log('클라이언트 : signin 라우터 연결')
  res.render(`signin.ejs`)
})

// 회원가입
router.get('/signup', (req, res) => {
  console.log('클라이언트 : signup 라우터 연결')
  res.render(`signup.ejs`)
})

router.post('/signup', User.userSignup) // 몽구스 유저등록 api 사용

module.exports = router

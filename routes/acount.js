const router = require('express').Router()
const { User } = require('../api/0.index') // 몽구스 api 임포트

// 로그인
router.get('/signin', (req, res) => {
  console.log('signin 라우터 연결')
  res.render(`signin.ejs`)
})
// 로그인실패
router.get('/signin-fail', (req, res) => {
  res.render(`signin-fail.ejs`, { msg: '로그인정보가 없습니다.' })
})

// 회원가입
router.get('/signup', (req, res) => {
  console.log('signup 라우터 연결')
  res.render(`signup.ejs`)
})

// 회원정보 수정
router.get('/modify', (req, res) => {
  console.log('acountModify 라우터 연결')
  res.render(`acountModify.ejs`, { 프로필: req.user })
})

// 회원가입 디비입력
router.post('/signup', User.userSignup) // 몽구스 유저등록 api 사용

// 사용자 비밀번호 확인
router.post('/validPassword', User.validPassword)

module.exports = router

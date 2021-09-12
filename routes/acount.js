const router = require('express').Router()
const client = require('../src/mongo')

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

router.post('/signup', (req, res, next) => {
  console.log('클라이언트 : 포스트데이터 전송')
  console.log('서버에 전달받은 데이터 : ', req.body)
  console.log('서버 유효성 검사')
  console.log('디비에 회원정보 입력') // 잘 되면
  const db = false //true 안되면 false
  if (db) {
    //res.redirect('/signin')
  } else {
    //res.redirect('/signup')
  }
})

// 프로필
router.get('/profile', (req, res) => {
  console.log('클라이언트 : profile 라우터 연결')
  console.log('전달받은 유져정보', req.user)
  res.render('profile.ejs', { 사용자: req.user })
})

module.exports = router

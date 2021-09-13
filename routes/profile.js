const router = require('express').Router()
const client = require('../src/mongo')

// 프로필
router.get('/profile', (req, res) => {
  console.log('클라이언트 : profile 라우터 연결')
  console.log('전달받은 유져정보', req.user)
  res.render('profile.ejs', { 사용자: req.user })
})

module.exports = router
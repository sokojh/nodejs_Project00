const router = require('express').Router()
const client = require('../src/mongo')

router.get(
  '/',
  (req, res, next) => {
    if (req.user) {
      next()
    } else {
      res.send('not sign in')
    }
  },
  (req, res) => {
    console.log('클라이언트 : profile 라우터 연결')
    console.log('전달받은 유져정보', req.user)
    res.render('profile.ejs', { 사용자: req.user })
  }
)

router.post('/add', (req, res) => {
  console.log('클라이언트 : 포스트데이터 전송')
  console.log('서버에 전달받은 데이터 : ', req.body)
  const data = req.body.data
  console.log('데이터 가공전 : ', data)
  res.redirect('../sendinput') // 이전단계로 되돌리기
})

module.exports = router

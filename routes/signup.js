const router = require('express').Router()
const client = require('../src/mongo')

router.get('/', (req, res) => {
  console.log('클라이언트 : signup 라우터 연결')
  res.render(`signup.ejs`)
})

router.post('/', (req, res, next) => {
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

module.exports = router

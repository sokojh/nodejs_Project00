// 라우터 예제파일

const router = require('express').Router()
const client = require('../src/mongo')

router.get('/', (req, res) => {
  //시작주소를 router.use로 받으면 다음 주소사용이 불가능합니다
  console.log('sendinput get / 클라이언트 연결')
  console.log('req.user : ', req.user)
  res.render(`sendinput.ejs`)
})

router.post('/add', (req, res) => {
  console.log('sendinput/add post')
  console.log('전달받은 데이터 : ', req.body)
  const data = req.body.data
  console.log('데이터 가공전 : ', data)
  res.redirect('../sendinput') // 이전단계로 되돌리기
})

module.exports = router

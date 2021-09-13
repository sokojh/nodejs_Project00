// 라우터 예제파일

const router = require('express').Router()
const client = require('../src/mongo')

router.get('/', (req, res) => {
  //시작주소를 router.use로 받으면 다음 주소사용이 불가능합니다
  console.log('sendinput get / 연결, 로그인 유져정보 :', req.user.email)
  res.render(`sendinput.ejs`)
})

router.post('/add', (req, res) => {
  console.log('sendinput/add post 연결')
  console.log('작성자 :', req.user.email)
  console.log('전달받은 데이터 :', req.body.data)
  const userEmail = req.user.email
  const data = req.body.data
  // 데이터 디비등록
  res.render('sendinput.ejs') // 이전단계로 되돌리기
})

module.exports = router

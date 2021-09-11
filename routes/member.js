const router = require('express').Router()
const appfn = require('../src/function_app')
const client = require('../src/mongo')

router.use('/', (req, res) => {
  //로그인 페이지
  res.render('../views/login.ejs')
  //페이지에서 로그인 정보 서브밋하면 아이디 비번정보가지고 /login으로 이동
})

router.use('/login', (req, res) => {
  console.log(req.id, req.pw)
})

router.get('/join', async function (요청, 응답) {
  // 응답.sendfile(__dirname + '/views/write.ejs');

  // 뷰페이지에서 정보 서버로 넘기고
  // 아래에 변수화 시켜서
  // 디비 연결
  await client.connect()
  // db
  const db = client.db('weeksom')

  const email = 요청.user.email
  const password = '받아온정보'
  const nickname = '받아온정보'

  await db.collection('users').insertMany({
    email: email,
    password: password,
    nickname: nickname,
  })

  await client.close()

  응답.render('../views/write.ejs')
})

module.exports = router

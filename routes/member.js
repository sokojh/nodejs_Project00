const router = require('express').Router()
const appfn = require('../src/function_app')
const client = require('./mongo')

router.use('/', appfn.로그인했니, (req, res) => {
  console.log('asdfasdf')
})

router.get('/login', function (요청, 응답) {
  // 응답.sendfile(__dirname + '/views/write.ejs');
  응답.render('../views/write.ejs')
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

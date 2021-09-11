// @ts-check

const router = require('express').Router()
const client = require('../src/mongo')
// const appfn = require('../src/function_app')

router.use('/', (req, res) => {
  //로그인 페이지
  res.render('../views/login.ejs')
  //페이지에서 로그인 정보 서브밋하면 아이디 비번정보가지고 /login으로 이동
})

router.use('/login', async (req, res) => {
  // 뷰에서 작성한 이메일, 비번가져오기
  const email = req.email
  const password = req.password
  console.log(email, password)

  // 디비연결
  await client.connect()
  const db = client.db('weeksom')
  // 해당 이메일 비번확인
  const cursor = await db
    .collection('users')
    .find({ email: email })
    .project({
      _id: 0, // 안보이게
      password: 1, // 보이게
      nickname: 0,
      profileImgKey: 0,
      userinfo: 0,
      following: 0,
      follower: 0,
      article: 0,
      bookmark: 0,
    })
    .toArray()
  // 비번 일치하는지
  if (cursor.password === password) {
    // 비번일치 세션정보저장
    res.send(console.log('비번확인'))
  } else {
    // 비번불일치 로그인폼으로 복귀
    res.send(console.log('비번확인'))
  }
})

router.get('/join', async function (요청, 응답) {
  // 응답.sendfile(__dirname + '/views/write.ejs');

  // 뷰페이지에서 정보 서버로 넘기고
  // 아래에 변수화 시켜서
  // 디비 연결
  // await client.connect()
  // // db
  // const db = client.db('weeksom')

  // const email = 요청.user.email
  // const password = '받아온정보'
  // const nickname = '받아온정보'

  // await db.collection('users').insertMany({
  //   email: email,
  //   password: password,
  //   nickname: nickname,
  // })

  // await client.close()

  응답.render('../views/write.ejs')
})

module.exports = router

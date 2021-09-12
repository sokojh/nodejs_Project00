// @ts-check

const router = require('express').Router()
const client = require('../src/mongo')

router.get('/', (req, res, next) => {
  //시작주소를 router.use로 받으면 다음 주소사용이 불가능합니다
  console.log('클라이언트 : sendinput 라우터 연결')
  res.render(`sendinput.ejs`)
})

router.post('/add', (req, res) => {
  console.log('클라이언트 : 포스트데이터 전송')
  console.log('서버에 전달받은 데이터 : ', req.body)
  const data = req.body.data
  console.log('데이터 가공전 : ', data)
  res.redirect('../sendinput') // 이전단계로 되돌리기
})

// router.use('/login', async (req, res) => {
//   // 뷰에서 작성한 이메일, 비번가져오기
//   const email = req.email
//   const password = req.password
//   console.log(email, password)

//   // 디비연결
//   await client.connect()
//   const db = client.db('weeksom')
//   // 해당 이메일 비번확인
//   const cursor = await db
//     .collection('users')
//     .find({ email: email })
//     .project({
//       _id: 0, // 안보이게
//       password: 1, // 보이게
//       nickname: 0,
//       profileImgKey: 0,
//       userinfo: 0,
//       following: 0,
//       follower: 0,
//       article: 0,
//       bookmark: 0,
//     })
//     .toArray()
//   // 비번 일치하는지
//   if (cursor.password === password) {
//     // 비번일치 세션정보저장
//     res.send(console.log('비번확인'))
//   } else {
//     // 비번불일치 로그인폼으로 복귀
//     res.send(console.log('비번확인'))
//   }
// })

// router.get('/join', async function (요청, 응답) {
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

//   응답.render('../views/write.ejs')
// })

module.exports = router
